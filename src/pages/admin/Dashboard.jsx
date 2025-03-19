import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { 
  Loader, 
  PlusCircle, 
  ShoppingBag, 
  Users, 
  Settings, 
  Tag, 
  BarChart, 
  Package, 
  Truck, 
  CreditCard 
} from 'lucide-react';

export default function AdminDashboard() {
  const { products, isLoading: productsLoading } = useProducts();
  const { orders, isLoading: ordersLoading } = useOrders();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (products && orders) {
      // Calculate total revenue
      const totalRevenue = orders.reduce((total, order) => {
        return total + (order.total || order.totalAmount || 0);
      }, 0);

      // Count unique customers
      const uniqueCustomers = new Set(orders.map(order => order.customerEmail || order.customerName)).size;

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
        .sort((a, b) => new Date(b.date || Date.now()) - new Date(a.date || Date.now()))
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

  // Quick access links for admin dashboard
  const quickAccessLinks = [
    { 
      title: 'Add Product', 
      icon: <PlusCircle size={36} />, 
      description: 'Create a new product listing', 
      path: '/admin/products/add',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Orders',
      icon: <ShoppingBag size={36} />,
      description: 'View and update order status',
      path: '/admin/orders',
      color: 'bg-blue-500'
    },
    {
      title: 'Customer List',
      icon: <Users size={36} />,
      description: 'View all customer accounts',
      path: '/admin/customers',
      color: 'bg-purple-500'
    },
    {
      title: 'Store Settings',
      icon: <Settings size={36} />,
      description: 'Modify your store configuration',
      path: '/admin/settings',
      color: 'bg-orange-500'
    },
    {
      title: 'Manage Categories',
      icon: <Tag size={36} />,
      description: 'Add or edit product categories',
      path: '/admin/settings#categories',
      color: 'bg-pink-500'
    },
    {
      title: 'Sales Reports',
      icon: <BarChart size={36} />,
      description: 'View financial performance',
      path: '/admin/reports',
      color: 'bg-yellow-500'
    },
    {
      title: 'Inventory',
      icon: <Package size={36} />,
      description: 'Check stock levels',
      path: '/admin/inventory',
      color: 'bg-indigo-500'
    },
    {
      title: 'Shipping',
      icon: <Truck size={36} />,
      description: 'Manage shipping options',
      path: '/admin/shipping',
      color: 'bg-teal-500'
    },
    {
      title: 'Payment Methods',
      icon: <CreditCard size={36} />,
      description: 'Setup payment gateways',
      path: '/admin/payments',
      color: 'bg-red-500'
    }
  ];

  if (productsLoading || ordersLoading) {
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

      {/* Stats */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="text-lg font-bold text-gray-900">{item.value}</dd>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Access</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickAccessLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate(link.path)}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${link.color} text-white`}>
                    {link.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-lg font-medium text-gray-900">{link.title}</dt>
                    <dd className="text-sm text-gray-500">{link.description}</dd>
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
                        Order #{order.id} - {order.customerName || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: <span className="font-medium capitalize">{order.status}</span> - 
                        {order.items?.length || 0} items, 
                        PKR {order.total || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
