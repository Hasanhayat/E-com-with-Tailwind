import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from './useOrders';
import { useProducts } from './useProducts';
import { useCustomers } from './useCustomers';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();
  const { customers } = useCustomers();

  useEffect(() => {
    const calculateAnalytics = async () => {
      try {
        setIsLoading(true);

        // Calculate total sales
        const totalSales = orders.reduce((total, order) => {
          return total + (order.totalAmount || order.items?.reduce((itemTotal, item) => 
            itemTotal + (item.price * item.quantity), 0) || 0);
        }, 0);

        // Calculate sales change (mock data for now)
        const salesChange = 15; // 15% increase

        // Calculate orders change (mock data for now)
        const ordersChange = 8; // 8% increase

        // Calculate products change (mock data for now)
        const productsChange = 5; // 5% increase

        // Calculate customers change (mock data for now)
        const customersChange = 12; // 12% increase

        // Get top selling products
        const topSellingProducts = products
          .sort((a, b) => (b.sold || 0) - (a.sold || 0))
          .slice(0, 5);

        // Get recent sales data
        const recentSales = orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 7)
          .map(order => ({
            date: new Date(order.createdAt).toLocaleDateString(),
            amount: order.totalAmount || order.items?.reduce((total, item) => 
              total + (item.price * item.quantity), 0) || 0
          }));

        // Get sales by category
        const salesByCategory = products.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + (product.sold || 0);
          return acc;
        }, {});

        setAnalytics({
          totalSales,
          salesChange,
          ordersChange,
          productsChange,
          customersChange,
          topSellingProducts,
          recentSales,
          salesByCategory
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === 'admin') {
      calculateAnalytics();
    }
  }, [user, orders, products, customers]);

  return {
    analytics,
    isLoading,
    error
  };
} 