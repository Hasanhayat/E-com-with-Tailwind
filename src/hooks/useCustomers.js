import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        // Here you would typically make an API call to your backend
        // For now, we'll use mock data
        const mockCustomers = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main St, City',
            createdAt: '2024-01-01',
            totalOrders: 5,
            totalSpent: 1500
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+0987654321',
            address: '456 Oak Ave, Town',
            createdAt: '2024-01-15',
            totalOrders: 3,
            totalSpent: 800
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+1122334455',
            address: '789 Pine Rd, Village',
            createdAt: '2024-02-01',
            totalOrders: 1,
            totalSpent: 300
          }
        ];

        setCustomers(mockCustomers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchCustomers();
    }
  }, [user]);

  const addCustomer = async (customerData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate adding a customer
      const newCustomer = {
        id: String(customers.length + 1),
        ...customerData,
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0
      };

      setCustomers(prev => [...prev, newCustomer]);
      return newCustomer;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCustomer = async (id, customerData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate updating a customer
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === id
            ? { ...customer, ...customerData }
            : customer
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate deleting a customer
      setCustomers(prev => prev.filter(customer => customer.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getCustomerById = (id) => {
    return customers.find(customer => customer.id === id);
  };

  const searchCustomers = (query) => {
    const searchTerm = query.toLowerCase();
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm)
    );
  };

  return {
    customers,
    isLoading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    searchCustomers
  };
} 