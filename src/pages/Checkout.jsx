import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { clearCart } from '../store/slices/cartSlice';
import { Loader, CreditCard, Truck, Check, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../context/ThemeContext';

// Local placeholder image instead of via.placeholder.com
const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
const errorImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23FF5555%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23FFEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart: clearCartHook } = useCart();
  const { themeColors } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'cod',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      navigate('/shop');
      toast.error('Your cart is empty. Please add items to checkout.');
    }
  }, [items, navigate, isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    
    // Format expiry date with slash
    if (name === 'cardExpiry') {
      formattedValue = value.replace(/\//g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      formattedValue = formattedValue.slice(0, 5);
    }
    
    // Limit CVV to 3-4 digits
    if (name === 'cardCvv') {
      formattedValue = value.slice(0, 4);
    }
    
    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^\d{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) 
        newErrors.phone = 'Phone should be 10-11 digits';
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'Province is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
      else if (!/^\d{5}$/.test(formData.postalCode)) 
        newErrors.postalCode = 'Postal code should be 5 digits';
    } else if (step === 3 && formData.paymentMethod === 'card') {
      // Validate card details only if payment method is card
      if (!cardData.cardNumber.trim()) 
        newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardData.cardNumber)) 
        newErrors.cardNumber = 'Invalid card number format (should be 16 digits)';
      
      if (!cardData.cardExpiry.trim()) 
        newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(cardData.cardExpiry)) 
        newErrors.cardExpiry = 'Invalid expiry date format (MM/YY)';
      
      if (!cardData.cardCvv.trim()) 
        newErrors.cardCvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(cardData.cardCvv)) 
        newErrors.cardCvv = 'CVV should be 3-4 digits';
      
      if (!cardData.cardName.trim()) 
        newErrors.cardName = 'Card holder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate form fields
      if (!formData.address || !formData.city || !formData.postalCode || !formData.country) {
        throw new Error('Please fill in all shipping details');
      }
      
      if (formData.paymentMethod === 'card' && (!cardData.cardNumber || !cardData.cardName || !cardData.cardExpiry || !cardData.cardCvv)) {
        throw new Error('Please fill in all payment details');
      }
      
      // Create order object
      const orderData = {
        user: user?.uid || 'guest',
        products: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentInfo: {
          method: formData.paymentMethod,
          status: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
          transactionId: formData.paymentMethod === 'cod' ? null : `txn_${Date.now()}`,
          cardNumber: cardData.cardNumber.slice(-4).padStart(16, '*'),
          cardName: cardData.cardName,
          cardExpiry: cardData.cardExpiry,
          cvv: '***'
        },
        notes: formData.notes,
        totalAmount: totalAmount || cartTotal,
        status: 'pending',
        createdAt: new Date()
      };
      
      // Call API to create order
      const response = await createOrder(orderData);
      
      // Clear cart after successful order
      clearCartHook();
      dispatch(clearCart());
      
      // Show success message
      toast.success('Order placed successfully!');
      
      // Navigate to success page
      navigate(`/order-success/${response.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalInfoStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your phone number (e.g., 03XX-XXXXXXX)"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            Next Step
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </motion.div>
    );
  };

  const renderShippingInfoStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Shipping Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your street address"
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your city"
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Province
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Province</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Islamabad">Islamabad Capital Territory</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                <option value="Azad Kashmir">Azad Kashmir</option>
              </select>
              {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your postal code (5 digits)"
            />
            {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            Next Step
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </motion.div>
    );
  };

  const renderPaymentStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment Method</h2>
        
        <div className="mb-6">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🚚</span>
                  <span className="font-medium text-gray-900">Cash on Delivery</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Pay when you receive your order
                </p>
              </div>
            </label>
            
            <div>
              <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <CreditCard size={20} className="text-blue-600" />
                    <span className="font-medium text-gray-900">Credit/Debit Card</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay securely with your card
                  </p>
                </div>
              </label>
              
              {formData.paymentMethod === 'card' && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Name on card"
                      />
                      {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="4444 5555 6666 7777"
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={cardData.cardExpiry}
                        onChange={handleCardChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="MM/YY"
                      />
                      {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        value={cardData.cardCvv}
                        onChange={handleCardChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="CVC/CVV"
                      />
                      {errors.cardCvv && <p className="mt-1 text-sm text-red-500">{errors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special instructions for delivery"
          ></textarea>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                Place Order
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>

      {currentStep === 1 && renderPersonalInfoStep()}
      {currentStep === 2 && renderShippingInfoStep()}
      {currentStep === 3 && renderPaymentStep()}
    </div>
  );
};

export default Checkout;