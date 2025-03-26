import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useCustomers } from '../../hooks/useCustomers';
import { 
  ChevronLeft,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Loader,
  Mail,
  Phone,
  MapPin,
  UserCircle,
  Trash,
  Calendar,
  User,
} from 'lucide-react';

export default function Customers() {
  const navigate = useNavigate();
  const { themeColors } = useTheme();
  const { customers, isLoading, deleteCustomer, searchCustomers } = useCustomers();
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle customer deletion
  const handleDeleteClick = (e, customerId) => {
    e.stopPropagation();
    setShowDeleteConfirm(customerId);
  };
  
  const confirmDelete = async (e, customerId) => {
    e.stopPropagation();
    try {
      await deleteCustomer(customerId);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(null);
  };
  
  // Filter and sort customers
  const filteredCustomers = [...customers]
    .filter(customer => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        (customer.name && customer.name.toLowerCase().includes(searchLower)) ||
        (customer.email && customer.email.toLowerCase().includes(searchLower)) ||
        (customer.phone && customer.phone.includes(searchTerm))
      );
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'email':
          aValue = a.email || '';
          bValue = b.email || '';
          break;
        case 'registered':
          aValue = new Date(a.registeredAt || 0);
          bValue = new Date(b.registeredAt || 0);
          break;
        case 'orders':
          aValue = a.orderCount || 0;
          bValue = b.orderCount || 0;
          break;
        default:
          return 0;
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size={40} className="animate-spin" style={{ color: themeColors.primaryColor }} />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
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
            Manage Customers
          </h1>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} style={{ color: themeColors.textSecondaryColor }} />
            </div>
            <input
              type="text"
              placeholder="Search by name, email or phone"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'rgba(0,0,0,0.1)', 
                backgroundColor: themeColors.cardColor,
                color: themeColors.textPrimaryColor,
                focusRingColor: themeColors.primaryColor
              }}
            />
          </div>
          
          {/* Filter Toggle */}
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
        
        {/* Expanded Filters - can be implemented later */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border rounded-md mb-4"
            style={{ 
              borderColor: 'rgba(0,0,0,0.1)', 
              backgroundColor: themeColors.cardColor,
              color: themeColors.textPrimaryColor
            }}
          >
            <p className="text-sm">Advanced filtering options can be added here.</p>
          </motion.div>
        )}
      </div>
      
      {/* Customers Table */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div 
            className="overflow-hidden shadow rounded-lg"
            style={{ backgroundColor: themeColors.cardColor }}
          >
            <table className="min-w-full divide-y" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <thead style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">
                    <button 
                      className="group inline-flex items-center"
                      onClick={() => handleSort('name')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Customer
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'name' ? (
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
                      onClick={() => handleSort('email')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Contact
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'email' ? (
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
                      onClick={() => handleSort('registered')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Registered
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'registered' ? (
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
                      onClick={() => handleSort('orders')}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      Orders
                      <span className="ml-2 flex-none rounded">
                        {sortField === 'orders' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={16} style={{ color: themeColors.primaryColor }} />
                          ) : (
                            <ArrowDown size={16} style={{ color: themeColors.primaryColor }} />
                          )
                        ) : null}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold pr-4">
                    <span style={{ color: themeColors.textPrimaryColor }}>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td 
                      colSpan={5} 
                      className="px-3 py-4 text-sm text-center"
                      style={{ color: themeColors.textSecondaryColor }}
                    >
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <motion.tr 
                      key={customer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}
                      style={{ color: themeColors.textPrimaryColor }}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User 
                                size={20} 
                                style={{ color: themeColors.textSecondaryColor }} 
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div style={{ color: themeColors.textSecondaryColor }}>
                              ID: {customer.id?.substring(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <Mail size={16} className="mr-2" style={{ color: themeColors.textSecondaryColor }} />
                            <span>{customer.email || 'N/A'}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={16} className="mr-2" style={{ color: themeColors.textSecondaryColor }} />
                            <span>{customer.phone || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" style={{ color: themeColors.textSecondaryColor }} />
                          <span>
                            {customer.registeredAt 
                              ? new Date(customer.registeredAt).toLocaleDateString() 
                              : 'N/A'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                        {customer.orderCount || 0}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                        {showDeleteConfirm === customer.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={(e) => confirmDelete(e, customer.id)}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="text-gray-500 hover:text-gray-700 font-medium"
                              style={{ color: themeColors.textSecondaryColor }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => handleDeleteClick(e, customer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash size={18} />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
            style={{ backgroundColor: themeColors.cardColor }}
          >
            <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <h3 className="text-lg font-medium" style={{ color: themeColors.textPrimaryColor }}>
                Customer Details
              </h3>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:w-1/3">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <UserCircle size={64} style={{ color: themeColors.textSecondaryColor }} />
                  </div>
                  <h2 className="text-xl font-bold text-center" style={{ color: themeColors.textPrimaryColor }}>
                    {selectedCustomer.name}
                  </h2>
                  <p className="text-sm text-center mt-1" style={{ color: themeColors.textSecondaryColor }}>
                    Customer since {new Date(selectedCustomer.registeredAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: themeColors.textSecondaryColor }}>
                        Email
                      </h4>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2" style={{ color: themeColors.primaryColor }} />
                        <p style={{ color: themeColors.textPrimaryColor }}>{selectedCustomer.email || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: themeColors.textSecondaryColor }}>
                        Phone
                      </h4>
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2" style={{ color: themeColors.primaryColor }} />
                        <p style={{ color: themeColors.textPrimaryColor }}>{selectedCustomer.phone || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: themeColors.textSecondaryColor }}>
                        Address
                      </h4>
                      <div className="flex items-start">
                        <MapPin size={16} className="mr-2 mt-1" style={{ color: themeColors.primaryColor }} />
                        <p style={{ color: themeColors.textPrimaryColor }}>
                          {selectedCustomer.address || 'No address on file'}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: themeColors.textSecondaryColor }}>
                        Total Orders
                      </h4>
                      <p className="font-medium" style={{ color: themeColors.textPrimaryColor }}>
                        {selectedCustomer.orderCount || 0} orders
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2" style={{ color: themeColors.textSecondaryColor }}>
                      Recent Activity
                    </h4>
                    <p className="text-sm" style={{ color: themeColors.textSecondaryColor }}>
                      Detailed order history and activity will be shown here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t flex justify-end" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 border rounded-md mr-2"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.1)', 
                  color: themeColors.textPrimaryColor,
                  backgroundColor: 'transparent'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Edit functionality to be implemented
                  setSelectedCustomer(null);
                }}
                className="px-4 py-2 rounded-md"
                style={{ 
                  backgroundColor: themeColors.primaryColor,
                  color: '#ffffff'
                }}
              >
                Edit Customer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 