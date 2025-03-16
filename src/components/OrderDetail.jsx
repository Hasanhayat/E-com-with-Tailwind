import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const OrderDetail = ({ order, onClose }) => {
  if (!order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Order #{order.id.slice(-6)}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><span className="font-medium">Name:</span> {order.shippingInfo?.name || 'N/A'}</p>
                <p><span className="font-medium">Email:</span> {order.shippingInfo?.email || 'N/A'}</p>
                <p><span className="font-medium">Phone:</span> {order.shippingInfo?.phone || 'N/A'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{order.shippingInfo?.address || 'N/A'}</p>
                <p>{order.shippingInfo?.city || 'N/A'}, {order.shippingInfo?.state || 'N/A'} {order.shippingInfo?.postalCode || 'N/A'}</p>
                <p>{order.shippingInfo?.country || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Order Status</h3>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'N/A'}
              </span>
              <span className="ml-4 text-gray-500">
                Created: {formatDate(order.createdAt)}
              </span>
              {order.updatedAt && (
                <span className="ml-4 text-gray-500">
                  Last Updated: {formatDate(order.updatedAt)}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={item.imageUrl || 'https://via.placeholder.com/100?text=No+Image'}
                              alt={item.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/100?text=Error';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.price?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity || 0}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium">
                      Total:
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold">
                      ₹{calculateTotal(order.items || []).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {order.paymentInfo && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><span className="font-medium">Payment Method:</span> {order.paymentInfo.method || 'N/A'}</p>
                <p><span className="font-medium">Payment Status:</span> {order.paymentInfo.status || 'N/A'}</p>
                {order.paymentInfo.transactionId && (
                  <p><span className="font-medium">Transaction ID:</span> {order.paymentInfo.transactionId}</p>
                )}
              </div>
            </div>
          )}

          {order.notes && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{order.notes}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetail; 