import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '../../hooks/useOrders';
import { Loader, Search, Filter, ChevronDown } from 'lucide-react';
import OrderDetail from '../../components/OrderDetail';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  Truck,
  ShoppingBag,
  X
} from 'lucide-react';

const Orders = () => {
  const navigate = useNavigate();
  const { themeColors } = useTheme();
  const { orders, isLoading, updateOrderStatus, refreshOrders, orderStatuses } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState({});
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Orders', icon: ShoppingBag },
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'processing', label: 'Processing', icon: Clock },
    { value: 'shipped', label: 'Shipped', icon: Truck },
    { value: 'completed', label: 'Completed', icon: CheckCircle },
    { value: 'cancelled', label: 'Cancelled', icon: X }
  ];
  
  const statusColors = {
    pending: '#f59e0b',    // Amber
    processing: '#3b82f6',  // Blue
    shipped: '#8b5cf6',    // Purple
    completed: '#10b981',  // Green
    cancelled: '#ef4444'   // Red
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus(orderId, newStatus);
      setShowStatusDropdown(prev => ({
        ...prev,
        [orderId]: false
      }));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
      console.error(error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const toggleStatusDropdown = (orderId) => {
    setShowStatusDropdown(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
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
    refreshOrders();
    toast.success('Orders refreshed successfully');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredOrders = orders
    .filter(order => {
      // Apply status filter
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }
      
      // Apply search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          (order.id && order.id.toString().includes(searchLower)) ||
          (order.shippingInfo?.name && order.shippingInfo?.name.toLowerCase().includes(searchLower)) ||
          (order.shippingInfo?.email && order.shippingInfo?.email.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      let aValue, bValue;
      
      switch (sortField) {
        case 'date':
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        case 'customer':
          aValue = a.shippingInfo?.name || '';
          bValue = b.shippingInfo?.name || '';
          break;
        case 'total':
          aValue = a.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
          bValue = b.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        default:
          return 0;
      }
      
      // Handle string vs number vs date comparison
      let comparison;
      if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue - bValue;
      } else {
        comparison = typeof aValue === 'string'
          ? aValue.localeCompare(bValue)
          : aValue - bValue;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
            style={{ color: themeColors.textSecondaryColor }}
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold" style={{ color: themeColors.textPrimaryColor }}>
            Manage Orders
          </h1>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} style={{ color: themeColors.textSecondaryColor }} />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID, name, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'rgba(0,0,0,0.1)', 
                backgroundColor: themeColors.cardColor,
                color: themeColors.textPrimaryColor,
                focusRingColor: themeColors.primaryColor
              }}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded border"
            style={{ 
              borderColor: 'rgba(0,0,0,0.1)', 
              backgroundColor: showFilters ? themeColors.primaryColor : themeColors.cardColor,
              color: showFilters ? '#ffffff' : themeColors.textPrimaryColor
            }}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
        
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border rounded-md mb-4"
            style={{ 
              borderColor: 'rgba(0,0,0,0.1)', 
              backgroundColor: themeColors.cardColor
            }}
          >
            <div className="flex flex-wrap gap-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeColors.textPrimaryColor }}
                >
                  Order Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => {
                    const isActive = statusFilter === status.value;
                    const StatusIcon = status.icon;
                    
                    return (
                      <button
                        key={status.value}
                        onClick={() => setStatusFilter(status.value)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm ${
                          isActive ? 'text-white' : ''
                        }`}
                        style={{ 
                          backgroundColor: isActive 
                            ? (status.value === 'all' ? themeColors.primaryColor : statusColors[status.value] || themeColors.primaryColor) 
                            : 'rgba(0,0,0,0.05)',
                          color: isActive ? '#ffffff' : themeColors.textPrimaryColor
                        }}
                      >
                        <StatusIcon size={16} />
                        <span>{status.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div 
            className="overflow-hidden shadow rounded-lg"
            style={{ backgroundColor: themeColors.cardColor }}
          >
            <table className="min-w-full divide-y"  style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <thead style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">
                    <button 
                      className="group inline-flex items-center"
                      onClick={() => handleSort('date')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Date
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'date' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={16} style={{ color: themeColors.primaryColor }} />
                          ) : (
                            <ArrowDown size={16} style={{ color: themeColors.primaryColor }} />
                          )
                        ) : null}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                    <button 
                      className="group inline-flex items-center"
                      onClick={() => handleSort('customer')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Customer
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'customer' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={16} style={{ color: themeColors.primaryColor }} />
                          ) : (
                            <ArrowDown size={16} style={{ color: themeColors.primaryColor }} />
                          )
                        ) : null}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                    <button 
                      className="group inline-flex items-center"
                      onClick={() => handleSort('total')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Total
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'total' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={16} style={{ color: themeColors.primaryColor }} />
                          ) : (
                            <ArrowDown size={16} style={{ color: themeColors.primaryColor }} />
                          )
                        ) : null}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                    <button 
                      className="group inline-flex items-center"
                      onClick={() => handleSort('status')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Status
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'status' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={16} style={{ color: themeColors.primaryColor }} />
                          ) : (
                            <ArrowDown size={16} style={{ color: themeColors.primaryColor }} />
                          )
                        ) : null}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                    <span style={{ color: themeColors.textPrimaryColor }}>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td 
                      colSpan={5} 
                      className="px-3 py-4 text-sm text-center"
                      style={{ color: themeColors.textSecondaryColor }}
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                        <div className="font-medium">#{order.id}</div>
                        <div style={{ color: themeColors.textSecondaryColor }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="font-medium">{order.shippingInfo?.name || 'N/A'}</div>
                        <div style={{ color: themeColors.textSecondaryColor }}>{order.shippingInfo?.email || 'N/A'}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                        ${(order.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          style={{
                            backgroundColor: `${statusColors[order.status]}20`,
                            color: statusColors[order.status]
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, e.target.value);
                          }}
                          className="block w-full py-1.5 pl-3 pr-10 text-sm rounded border focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: 'rgba(0,0,0,0.1)', 
                            backgroundColor: themeColors.cardColor,
                            color: themeColors.textPrimaryColor,
                            focusRingColor: themeColors.primaryColor
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Object.keys(statusColors).map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders; 