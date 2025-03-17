import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, Printer } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { Loader } from 'lucide-react';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { orders, isLoading } = useOrders();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orders.length > 0 && orderId) {
      const foundOrder = orders.find(o => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orders, orderId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <Loader size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 bg-green-50 border-b border-green-100 flex items-center">
          <CheckCircle size={48} className="text-green-500 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h1>
            <p className="text-gray-600">Thank you for your purchase.</p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><span className="font-medium">Order ID:</span> {orderId ? `#${orderId.slice(-6)}` : 'N/A'}</p>
              <p><span className="font-medium">Date:</span> {order ? formatDate(order.createdAt) : 'N/A'}</p>
              <p><span className="font-medium">Payment Method:</span> {order?.paymentInfo?.method === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
              <p><span className="font-medium">Payment Status:</span> {order?.paymentInfo?.status === 'paid' ? 'Paid' : 'Pending'}</p>
            </div>
          </div>

          {order && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Items Ordered</h2>
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
                            PKR {item.price?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity || 0}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            PKR {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
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
                          PKR {order.items?.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) || '0.00'}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><span className="font-medium">Name:</span> {order.shippingInfo?.name || 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {order.shippingInfo?.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {order.shippingInfo?.phone || 'N/A'}</p>
                  <p><span className="font-medium">Address:</span> {order.shippingInfo?.address || 'N/A'}</p>
                  <p>
                    {order.shippingInfo?.city || 'N/A'}, {order.shippingInfo?.state || 'N/A'} {order.shippingInfo?.postalCode || 'N/A'}, {order.shippingInfo?.country || 'Pakistan'}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              <Printer size={18} className="mr-2" />
              Print Receipt
            </button>
            
            <Link
              to="/user/orders"
              className="w-full sm:w-auto px-6 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors flex items-center justify-center"
            >
              <ShoppingBag size={18} className="mr-2" />
              View My Orders
            </Link>
            
            <Link
              to="/shop"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
