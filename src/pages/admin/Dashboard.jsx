import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';

export default function AdminDashboard() {
  const { products } = useProducts();
  const { items } = useSelector((state) => state.cart);

  const stats = [
    {
      name: 'Total Products',
      value: products?.length || 0,
      icon: '📦',
    },
    {
      name: 'Active Orders',
      value: items.length,
      icon: '🛍️',
    },
    {
      name: 'Total Revenue',
      value: `$${items.reduce((total, item) => total + item.price * item.quantity, 0)}`,
      icon: '💰',
    },
    {
      name: 'Customers',
      value: '25',
      icon: '👥',
    },
  ];

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
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-6 py-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New order received
                    </p>
                    <p className="text-sm text-gray-500">
                      Order #{1000 + item} has been placed
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">5m ago</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Add Product', icon: '➕', color: 'bg-green-500' },
            { name: 'View Orders', icon: '📋', color: 'bg-blue-500' },
            { name: 'Manage Users', icon: '👥', color: 'bg-purple-500' },
          ].map((action, index) => (
            <motion.button
              key={action.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${action.color} p-4 rounded-lg text-white flex items-center justify-center space-x-2`}
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