import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc, query, orderBy, onSnapshot, where, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Define order statuses
  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Sample orders data
        const mockOrders = [
          {
            id: 1,
            customerName: 'John Doe',
            customerEmail: 'john.doe@example.com',
            date: '2023-04-10',
            status: 'completed',
            total: 125.99,
            items: [
              { id: 1, name: 'Classic T-Shirt', price: 29.99, quantity: 2 },
              { id: 2, name: 'Denim Jeans', price: 59.99, quantity: 1 }
            ],
            shipping: {
              address: '123 Main St, New York, NY',
              method: 'Standard',
              cost: 5.99
            },
            payment: {
              method: 'Credit Card',
              status: 'Paid'
            }
          },
          {
            id: 2,
            customerName: 'Jane Smith',
            customerEmail: 'jane.smith@example.com',
            date: '2023-04-11',
            status: 'processing',
            total: 89.99,
            items: [
              { id: 3, name: 'Summer Dress', price: 49.99, quantity: 1 },
              { id: 4, name: 'Sandals', price: 34.99, quantity: 1 }
            ],
            shipping: {
              address: '456 Park Ave, Boston, MA',
              method: 'Express',
              cost: 9.99
            },
            payment: {
              method: 'PayPal',
              status: 'Paid'
            }
          },
          {
            id: 3,
            customerName: 'Robert Johnson',
            customerEmail: 'robert.johnson@example.com',
            date: '2023-04-12',
            status: 'pending',
            total: 199.99,
            items: [
              { id: 5, name: 'Leather Jacket', price: 199.99, quantity: 1 }
            ],
            shipping: {
              address: '789 Main St, Chicago, IL',
              method: 'Standard',
              cost: 5.99
            },
            payment: {
              method: 'Credit Card',
              status: 'Pending'
            }
          },
          {
            id: 4,
            customerName: 'Sarah Williams',
            customerEmail: 'sarah.williams@example.com',
            date: '2023-04-12',
            status: 'completed',
            total: 65.98,
            items: [
              { id: 6, name: 'Running Shoes', price: 59.99, quantity: 1 }
            ],
            shipping: {
              address: '101 Oak St, San Francisco, CA',
              method: 'Standard',
              cost: 5.99
            },
            payment: {
              method: 'Debit Card',
              status: 'Paid'
            }
          },
          {
            id: 5,
            customerName: 'Michael Brown',
            customerEmail: 'michael.brown@example.com',
            date: '2023-04-13',
            status: 'shipped',
            total: 145.97,
            items: [
              { id: 7, name: 'Hoodie', price: 39.99, quantity: 1 },
              { id: 8, name: 'Sweatpants', price: 29.99, quantity: 2 }
            ],
            shipping: {
              address: '202 Pine St, Seattle, WA',
              method: 'Express',
              cost: 9.99
            },
            payment: {
              method: 'Credit Card',
              status: 'Paid'
            }
          }
        ];
        
        setOrders(mockOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user?.role === 'admin') {
      fetchOrders();
    }
  }, [user]);
  
  // Add an order
  const addOrder = async (order) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newOrder = {
        id: orders.length + 1,
        ...order,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      setOrders([newOrder, ...orders]);
      return newOrder;
    } catch (err) {
      setError('Failed to add order.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update an order
  const updateOrder = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedOrders = orders.map(order => 
        order.id === id ? { ...order, ...updatedData } : order
      );
      
      setOrders(updatedOrders);
      return updatedOrders.find(order => order.id === id);
    } catch (err) {
      setError('Failed to update order.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete an order
  const deleteOrder = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);
      return true;
    } catch (err) {
      setError('Failed to delete order.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get order by ID
  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };
  
  // Filter orders
  const filterOrders = (status) => {
    if (!status || status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const createOrder = async (orderData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const orderRef = collection(db, 'orders');
      const newOrder = {
        ...orderData,
        userId: user?.uid || 'guest',
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(orderRef, newOrder);
      
      setIsLoading(false);
      return { id: docRef.id, ...newOrder };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const getOrders = async (userId = user?.uid) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!userId) {
        throw new Error('User ID is required to fetch orders');
      }
      
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const orders = [];
      
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      
      setIsLoading(false);
      return orders;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  const getOrder = async (orderId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!orderId) {
        throw new Error('Order ID is required');
      }
      
      const orderRef = doc(db, 'orders', orderId);
      const orderSnap = await getDoc(orderRef);
      
      if (!orderSnap.exists()) {
        throw new Error('Order not found');
      }
      
      const orderData = { id: orderSnap.id, ...orderSnap.data() };
      
      setIsLoading(false);
      return orderData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  return { 
    orders, 
    isLoading, 
    error, 
    addOrder, 
    updateOrder, 
    deleteOrder, 
    getOrderById, 
    filterOrders,
    orderStatuses,
    createOrder,
    getOrders,
    getOrder
  };
} 