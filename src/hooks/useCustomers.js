import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Sample customers data
        const mockCustomers = [
          { 
            id: 1, 
            name: 'John Doe', 
            email: 'john.doe@example.com', 
            phone: '+1 123-456-7890',
            createdAt: '2023-02-15',
            totalOrders: 5,
            totalSpent: 450
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            email: 'jane.smith@example.com', 
            phone: '+1 234-567-8901',
            createdAt: '2023-03-21',
            totalOrders: 3,
            totalSpent: 320
          },
          { 
            id: 3, 
            name: 'Robert Johnson', 
            email: 'robert.johnson@example.com', 
            phone: '+1 345-678-9012',
            createdAt: '2023-01-10',
            totalOrders: 8,
            totalSpent: 780
          },
          { 
            id: 4, 
            name: 'Sarah Williams', 
            email: 'sarah.williams@example.com', 
            phone: '+1 456-789-0123',
            createdAt: '2023-04-05',
            totalOrders: 2,
            totalSpent: 190
          },
          { 
            id: 5, 
            name: 'Michael Brown', 
            email: 'michael.brown@example.com', 
            phone: '+1 567-890-1234',
            createdAt: '2023-04-12',
            totalOrders: 1,
            totalSpent: 85
          }
        ];
        
        setCustomers(mockCustomers);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to fetch customers data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user?.role === 'admin') {
      fetchCustomers();
    }
  }, [user]);
  
  // Add a customer
  const addCustomer = async (customer) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCustomer = {
        id: customers.length + 1,
        ...customer,
        createdAt: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0
      };
      
      setCustomers([...customers, newCustomer]);
      return newCustomer;
    } catch (err) {
      setError('Failed to add customer.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update a customer
  const updateCustomer = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCustomers = customers.map(customer => 
        customer.id === id ? { ...customer, ...updatedData } : customer
      );
      
      setCustomers(updatedCustomers);
      return updatedCustomers.find(customer => customer.id === id);
    } catch (err) {
      setError('Failed to update customer.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a customer
  const deleteCustomer = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(updatedCustomers);
      return true;
    } catch (err) {
      setError('Failed to delete customer.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Search customers
  const searchCustomers = (query) => {
    if (!query) return customers;
    
    const lowercaseQuery = query.toLowerCase();
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(lowercaseQuery) || 
      customer.email.toLowerCase().includes(lowercaseQuery)
    );
  };
  
  return { 
    customers, 
    isLoading, 
    error, 
    addCustomer, 
    updateCustomer, 
    deleteCustomer, 
    searchCustomers 
  };
} 