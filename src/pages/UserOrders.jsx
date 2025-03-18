import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { Loader, ShoppingBag, ChevronRight, ClipboardList } from 'lucide-react';

// Local placeholder image
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' fill='%23999999'%3EImage%3C/text%3E%3C/svg%3E";
const errorImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f8d7da'/%3E%3Ctext x='50%25' y='50%25' font-size='8' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' fill='%23721c24'%3EError%3C/text%3E%3C/svg%3E";

const UserOrders = () => {
  const { orders, isLoading } = useOrders();
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  
  useEffect(() => {
    if (orders.length > 0 && user) {
      // Filter orders for the current user
      const filteredOrders = orders.filter(order => 
        order.userId === user.uid || order.shippingInfo?.email === user.email
      );
      
      // Sort by date descending
      const sortedOrders = [...filteredOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setUserOrders(sortedOrders);
    }
  }, [orders, user]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center items-center">
        <Loader size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
      
      {userOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <ClipboardList size={18} className="text-gray-600 mr-2" />
                    <span className="font-semibold text-gray-800">Order #{order.id.slice(-6)}</span>
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                </div>
                <div className="mt-3 sm:mt-0">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
                  <div className="space-y-3">
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.imageUrl || placeholderImage}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = errorImage;
                            }}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">Qty: {item.quantity} × PKR {item.price?.toFixed(2) || '0.00'}</div>
                        </div>
                      </div>
                    ))}
                    {order.items?.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{order.items.length - 3} more item(s)
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="font-medium">
                    Total: PKR {order.totalAmount?.toFixed(2) || order.items?.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) || '0.00'}
                  </div>
                  <Link
                    to={`/order-success/${order.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders; 