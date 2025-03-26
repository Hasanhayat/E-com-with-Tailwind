import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useSettings } from '../../hooks/useSettings';
import { Truck, Clock, DollarSign, Package, Save, AlertCircle } from 'lucide-react';

export default function Shipping() {
  const { themeColors } = useTheme();
  const { settings, isLoading, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    shippingMethods: [
      { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '3-5' },
      { id: 'express', name: 'Express Shipping', price: 12.99, days: '1-2' },
    ],
    freeShippingThreshold: 50,
    internationalShipping: false,
    internationalRate: 25,
    restrictions: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [newRestriction, setNewRestriction] = useState('');

  useEffect(() => {
    if (settings?.shipping) {
      setFormData({
        ...formData,
        ...settings.shipping,
      });
    }
  }, [settings]);

  const handleShippingMethodChange = (index, field, value) => {
    const updatedMethods = [...formData.shippingMethods];
    updatedMethods[index] = { ...updatedMethods[index], [field]: value };
    setFormData({ ...formData, shippingMethods: updatedMethods });
  };

  const handleAddShippingMethod = () => {
    setFormData({
      ...formData,
      shippingMethods: [
        ...formData.shippingMethods,
        { id: `method-${Date.now()}`, name: 'New Method', price: 0, days: '3-5' },
      ],
    });
  };

  const handleRemoveShippingMethod = (index) => {
    const updatedMethods = [...formData.shippingMethods];
    updatedMethods.splice(index, 1);
    setFormData({ ...formData, shippingMethods: updatedMethods });
  };

  const handleAddRestriction = () => {
    if (newRestriction.trim()) {
      setFormData({
        ...formData,
        restrictions: [...formData.restrictions, newRestriction.trim()],
      });
      setNewRestriction('');
    }
  };

  const handleRemoveRestriction = (index) => {
    const updatedRestrictions = [...formData.restrictions];
    updatedRestrictions.splice(index, 1);
    setFormData({ ...formData, restrictions: updatedRestrictions });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification({ show: false, type: '', message: '' });

    try {
      // Update the shipping settings in the store settings
      await updateSettings({
        ...settings,
        shipping: formData,
      });
      
      setNotification({
        show: true,
        type: 'success',
        message: 'Shipping settings updated successfully!',
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 3000);
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: `Error: ${error.message}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Shipping Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure your store's shipping methods and policies.
          </p>
        </div>
      </div>

      {notification.show && (
        <div
          className={`mb-6 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <Save className="h-5 w-5 text-green-400" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipping Methods Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Shipping Methods</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Configure the shipping options available to your customers.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddShippingMethod}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Method
            </button>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {formData.shippingMethods.map((method, index) => (
              <div key={method.id} className="mb-6 pb-6 border-b border-gray-200 last:mb-0 last:pb-0 last:border-b-0">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-gray-400" />
                    <span>Shipping Method {index + 1}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveShippingMethod(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor={`method-name-${index}`} className="block text-sm font-medium text-gray-700">
                      Method Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id={`method-name-${index}`}
                        value={method.name}
                        onChange={(e) => handleShippingMethodChange(index, 'name', e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`method-price-${index}`} className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id={`method-price-${index}`}
                        value={method.price}
                        onChange={(e) => handleShippingMethodChange(index, 'price', parseFloat(e.target.value))}
                        step="0.01"
                        min="0"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor={`method-days-${index}`} className="block text-sm font-medium text-gray-700">
                      Days
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id={`method-days-${index}`}
                        value={method.days}
                        onChange={(e) => handleShippingMethodChange(index, 'days', e.target.value)}
                        placeholder="3-5"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Shipping Threshold */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Free Shipping Threshold</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Set the minimum order value for free shipping.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="sm:col-span-2">
              <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700">
                Minimum Order Value for Free Shipping ($)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="number"
                  name="freeShippingThreshold"
                  id="freeShippingThreshold"
                  value={formData.freeShippingThreshold}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Set to 0 to disable free shipping.
              </p>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">International Shipping</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Configure international shipping options.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="internationalShipping"
                  name="internationalShipping"
                  type="checkbox"
                  checked={formData.internationalShipping}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="internationalShipping" className="font-medium text-gray-700">
                  Enable International Shipping
                </label>
                <p className="text-gray-500">Allow customers from other countries to place orders.</p>
              </div>
            </div>

            {formData.internationalShipping && (
              <div className="sm:col-span-2 mt-4">
                <label htmlFor="internationalRate" className="block text-sm font-medium text-gray-700">
                  International Shipping Rate ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="number"
                    name="internationalRate"
                    id="internationalRate"
                    value={formData.internationalRate}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  This rate will be added to the standard shipping cost for international orders.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Restrictions */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Shipping Restrictions</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Specify countries or regions where you do not ship.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label htmlFor="newRestriction" className="block text-sm font-medium text-gray-700">
                Add Restriction
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="newRestriction"
                  id="newRestriction"
                  value={newRestriction}
                  onChange={(e) => setNewRestriction(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  placeholder="Country or region name"
                />
                <button
                  type="button"
                  onClick={handleAddRestriction}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {formData.restrictions.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {formData.restrictions.map((restriction, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{restriction}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRestriction(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No shipping restrictions added yet.</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
} 