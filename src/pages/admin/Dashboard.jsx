import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { Loader } from 'lucide-react';

export default function AdminDashboard() {
  const { products } = useProducts();
  const { orders, isLoading } = useOrders();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (products && orders) {
      // Calculate total revenue
      const totalRevenue = orders.reduce((total, order) => {
        return total + (order.totalAmount || order.items?.reduce((itemTotal, item) => 
          itemTotal + (item.price * item.quantity), 0) || 0);
      }, 0);

      // Count unique customers
      const uniqueCustomers = new Set(orders.map(order => order.userId || order.shippingInfo?.email)).size;

      // Update stats
      setStats([
        {
          name: 'Total Products',
          value: products.length || 0,
          icon: '📦',
        },
        {
          name: 'Active Orders',
          value: orders.filter(order => 
            order.status === 'pending' || 
            order.status === 'processing' || 
            order.status === 'shipped').length,
          icon: '🛍️',
        },
        {
          name: 'Total Revenue',
          value: `PKR ${totalRevenue.toFixed(2)}`,
          icon: '💰',
        },
        {
          name: 'Customers',
          value: uniqueCustomers || 0,
          icon: '👥',
        },
      ]);

      // Get most recent orders
      const recent = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentOrders(recent);
    }
  }, [products, orders]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const quickActions = [
    { name: 'Add Product', icon: '➕', color: 'bg-green-500', path: '/admin/products' },
    { name: 'View Orders', icon: '📋', color: 'bg-blue-500', path: '/admin/orders' },
    { name: 'Manage Users', icon: '👥', color: 'bg-purple-500', path: '/admin/users' },
    { name: 'Go to Shop', icon: '🛒', color: 'bg-orange-500', path: '/shop' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Admin Dashboard
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
        <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
          {recentOrders.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No orders yet
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <motion.li
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/orders`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">🔔</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Order #{order.id.slice(-6)} - {order.shippingInfo?.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: <span className="font-medium capitalize">{order.status}</span> - 
                        {order.items?.length} items, 
                        PKR {order.totalAmount || order.items?.reduce((total, item) => 
                          total + (item.price * item.quantity), 0).toFixed(2) || '0.00'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${action.color} p-4 rounded-lg text-white flex items-center justify-center space-x-2`}
              onClick={() => navigate(action.path)}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="font-medium">{action.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 