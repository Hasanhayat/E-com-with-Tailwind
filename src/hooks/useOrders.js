import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToOrders();
    return () => unsubscribe();
  }, [user]);

  const subscribeToOrders = () => {
    setIsLoading(true);
    try {
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        if (snapshot.empty) {
          console.log('No orders found');
          setOrders([]);
        } else {
          const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        }
        setIsLoading(false);
      }, (err) => {
        console.error('Error subscribing to orders:', err);
        setError(err.message);
        setIsLoading(false);
        toast.error('Failed to load orders');
      });
      
      return unsubscribe;
    } catch (err) {
      console.error('Error setting up orders subscription:', err);
      setError(err.message);
      setIsLoading(false);
      return () => {};
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(ordersQuery);
      
      if (snapshot.empty) {
        console.log('No orders found');
        setOrders([]);
      } else {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      if (!orderId) {
        throw new Error('Order ID is required');
      }
      
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { 
          ...order, 
          status: newStatus,
          updatedAt: new Date().toISOString()
        } : order
      ));
      
      return true;
    } catch (err) {
      console.error('Error updating order status:', err);
      throw err;
    }
  };

  const createOrder = async (orderData) => {
    try {
      if (!orderData) {
        throw new Error('Order data is required');
      }
      
      // Ensure required fields
      const newOrder = {
        ...orderData,
        status: orderData.status || 'pending',
        createdAt: orderData.createdAt || new Date().toISOString(),
      };
      
      console.log('Creating new order:', newOrder);
      
      const docRef = await addDoc(collection(db, 'orders'), newOrder);
      
      const createdOrder = {
        id: docRef.id,
        ...newOrder
      };
      
      console.log('Order created successfully:', createdOrder);
      
      // Update local state
      setOrders(prevOrders => [createdOrder, ...prevOrders]);
      
      return createdOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const refreshOrders = () => {
    return fetchOrders();
  };

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
    createOrder,
    refreshOrders
  };
} 