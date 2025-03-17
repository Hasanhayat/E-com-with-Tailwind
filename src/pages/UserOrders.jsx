import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { Loader, Package, ShoppingBag, Clock, Check, X } from 'lucide-react';
import OrderDetail from '../components/OrderDetail';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const { orders, isLoading, refreshOrders } = useOrders();
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user && orders.length > 0) {
      // Filter orders for the current user
      const filteredOrders = orders.filter(
        order => order.userId === user.uid || order.shippingInfo?.email === user.email
      );
      setUserOrders(filteredOrders);
    }
  }, [orders, user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={18} />;
      case 'processing':
        return <Package className="text-blue-500" size={18} />;
      case 'shipped':
        return <ShoppingBag className="text-purple-500" size={18} />;
      case 'delivered':
        return <Check className="text-green-500" size={18} />;
      case 'cancelled':
        return <X className="text-red-500" size={18} />;
      default:
        return <Clock className="text-gray-500" size={18} />;
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleRefresh = () => {
    toast.promise(
      refreshOrders(),
      {
        loading: 'Refreshing orders...',
        success: 'Orders refreshed successfully',
        error: 'Failed to refresh orders',
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh Orders
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size={40} className="animate-spin text-blue-600" />
        </div>
      ) : userOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link 
            to="/shop" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {userOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id.slice(-6)}</h2>
                    <p className="text-gray-500 text-sm">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center">
                    <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}</span>
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                      <div className="flex flex-wrap gap-2">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <div key={index} className="relative">
                            <img
                              src={item.imageUrl || 'https://via.placeholder.com/100?text=No+Image'}
                              alt={item.name}
                              className="h-16 w-16 rounded-md object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/100?text=Error';
                              }}
                            />
                            {item.quantity > 1 && (
                              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {item.quantity}
                              </span>
                            )}
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="flex items-center justify-center h-16 w-16 bg-gray-100 rounded-md">
                            <span className="text-gray-500 text-sm">+{order.items.length - 3} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Order Total</h3>
                      <p className="text-lg font-bold">
                        ₹{order.items?.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) || '0.00'}
                      </p>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <OrderDetail 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default UserOrders; 