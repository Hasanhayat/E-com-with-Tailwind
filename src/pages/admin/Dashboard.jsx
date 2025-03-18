import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import { useCustomers } from '../../hooks/useCustomers';
import { useAnalytics } from '../../hooks/useAnalytics';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  UserPlus,
  PlusCircle,
  Settings,
  FileText,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { store } = useTheme();
  const { orders, isLoading: ordersLoading } = useOrders();
  const { products, isLoading: productsLoading } = useProducts();
  const { customers, isLoading: customersLoading } = useCustomers();
  const { analytics, isLoading: analyticsLoading } = useAnalytics();
  const [activeTab, setActiveTab] = useState('overview');

  const quickAccessLinks = [
    {
      title: 'Add Product',
      description: 'Add a new product to your store',
      icon: PlusCircle,
      href: '/admin/products/new',
      color: 'bg-blue-500',
    },
    {
      title: 'Add Customer',
      description: 'Add a new customer to your store',
      icon: UserPlus,
      href: '/admin/customers/new',
      color: 'bg-green-500',
    },
    {
      title: 'Settings',
      description: 'Manage your store settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-orange-500',
    },
    {
      title: 'Orders',
      description: 'View and manage orders',
      icon: ShoppingBag,
      href: '/admin/orders',
      color: 'bg-purple-500',
    },
    {
      title: 'Products',
      description: 'Manage your products',
      icon: Package,
      href: '/admin/products',
      color: 'bg-red-500',
    },
    {
      title: 'Customers',
      description: 'View and manage customers',
      icon: Users,
      href: '/admin/customers',
      color: 'bg-yellow-500',
    },
    {
      title: 'Reports',
      description: 'View store reports and analytics',
      icon: FileText,
      href: '/admin/reports',
      color: 'bg-indigo-500',
    },
    {
      title: 'Help & Support',
      description: 'Get help and support',
      icon: HelpCircle,
      href: '/admin/support',
      color: 'bg-pink-500',
    },
  ];

  const stats = [
    {
      name: 'Total Sales',
      value: analytics?.totalSales || 0,
      change: analytics?.salesChange || 0,
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      name: 'Total Orders',
      value: orders?.length || 0,
      change: analytics?.ordersChange || 0,
      icon: ShoppingBag,
      color: 'text-blue-500',
    },
    {
      name: 'Total Products',
      value: products?.length || 0,
      change: analytics?.productsChange || 0,
      icon: Package,
      color: 'text-purple-500',
    },
    {
      name: 'Total Customers',
      value: customers?.length || 0,
      change: analytics?.customersChange || 0,
      icon: Users,
      color: 'text-orange-500',
    },
  ];

  const recentOrders = orders?.slice(0, 5) || [];
  const recentCustomers = customers?.slice(0, 5) || [];
  const topProducts = products?.slice(0, 5) || [];

  if (ordersLoading || productsLoading || customersLoading || analyticsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {user?.name}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Store className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {store.name}
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </motion.button>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccessLinks.map((link) => (
            <motion.a
              key={link.title}
              href={link.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${link.color}`}>
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{link.title}</h4>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="self-center flex-shrink-0 h-5 w-5 text-current" />
                        <span className="sr-only">
                          {stat.change >= 0 ? 'Increased by' : 'Decreased by'}
                        </span>
                        {Math.abs(stat.change)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <ShoppingCart className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customerName} - ${order.total}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Recent Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Customers</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentCustomers.map((customer) => (
                  <li key={customer.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <li key={product.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${product.price} - {product.stock} in stock
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 