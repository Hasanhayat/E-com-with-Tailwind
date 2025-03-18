import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      try {
        setIsLoading(true);
        // Here you would typically make an API call to your backend
        // For now, we'll use mock data
        const mockOrders = [
          {
            id: '1',
            customerName: 'John Doe',
            items: [
              {
                id: '1',
                name: 'Product 1',
                price: 100,
                quantity: 2
              }
            ],
            totalAmount: 200,
            status: 'completed',
            createdAt: '2024-01-01'
          },
          {
            id: '2',
            customerName: 'Jane Smith',
            items: [
              {
                id: '2',
                name: 'Product 2',
                price: 150,
                quantity: 1
              }
            ],
            totalAmount: 150,
            status: 'pending',
            createdAt: '2024-01-15'
          },
          {
            id: '3',
            customerName: 'Mike Johnson',
            items: [
              {
                id: '3',
                name: 'Product 3',
                price: 200,
                quantity: 3
              }
            ],
            totalAmount: 600,
            status: 'processing',
            createdAt: '2024-02-01'
          }
        ];

        setOrders(mockOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  const addOrder = async (orderData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate adding an order
      const newOrder = {
        id: String(orders.length + 1),
        ...orderData,
        createdAt: new Date().toISOString()
      };

      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate updating an order
      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  return {
    orders,
    isLoading,
    error,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus,
    orderStatuses
  };
} 