import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from './useOrders';
import { useProducts } from './useProducts';
import { useCustomers } from './useCustomers';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    salesChange: 0,
    ordersChange: 0,
    productsChange: 0,
    customersChange: 0,
    topSellingProducts: [],
    salesByCategory: [],
    recentSales: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();
  const { customers } = useCustomers();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample analytics data
        const mockAnalytics = {
          totalSales: 24580,
          salesChange: 12.5,
          ordersChange: 8.2,
          productsChange: 4.3,
          customersChange: 10.7,
          topSellingProducts: [
            { id: 1, name: 'Classic T-Shirt', sales: 120, revenue: 2980 },
            { id: 2, name: 'Denim Jeans', sales: 98, revenue: 4900 },
            { id: 3, name: 'Leather Jacket', sales: 45, revenue: 8100 },
            { id: 4, name: 'Summer Dress', sales: 78, revenue: 3120 },
            { id: 5, name: 'Running Shoes', sales: 65, revenue: 5200 }
          ],
          salesByCategory: [
            { category: 'Men', sales: 8450 },
            { category: 'Women', sales: 10200 },
            { category: 'Kids', sales: 3650 },
            { category: 'Accessories', sales: 2280 }
          ],
          recentSales: [
            { id: 1, date: '2023-04-01', amount: 125 },
            { id: 2, date: '2023-04-02', amount: 348 },
            { id: 3, date: '2023-04-03', amount: 256 },
            { id: 4, date: '2023-04-04', amount: 175 },
            { id: 5, date: '2023-04-05', amount: 452 },
            { id: 6, date: '2023-04-06', amount: 278 },
            { id: 7, date: '2023-04-07', amount: 189 }
          ]
        };
        
        setAnalytics(mockAnalytics);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to fetch analytics data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user?.role === 'admin') {
      fetchAnalytics();
    }
  }, [user, orders, products, customers]);
  
  return { analytics, isLoading, error };
} 