import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

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
      
      const newOrder = {
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      const docRef = await addDoc(collection(db, 'orders'), newOrder);
      
      const createdOrder = {
        id: docRef.id,
        ...newOrder
      };
      
      // Update local state
      setOrders([createdOrder, ...orders]);
      
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