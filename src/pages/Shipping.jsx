import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';
import { Truck, Package, Clock, Shield } from 'lucide-react';

export default function Shipping() {
  const { store, themeColors } = useTheme();

  const shippingInfo = [
    {
      title: 'Standard Shipping',
      description: '3-5 business days',
      price: store.shipping.standardFee,
      icon: Truck,
    },
    {
      title: 'Express Shipping',
      description: '1-2 business days',
      price: store.shipping.expressFee,
      icon: Package,
    },
    {
      title: 'Free Shipping',
      description: `Orders over ${store.shipping.freeThreshold}`,
      price: 'Free',
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold mb-4" style={{ color: themeColors.textPrimaryColor }}>
          Shipping Information
        </h1>
        <p className="text-lg" style={{ color: themeColors.textSecondaryColor }}>
          Learn about our shipping methods and delivery times
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {shippingInfo.map((info, index) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
            style={{ backgroundColor: themeColors.cardColor }}
          >
            <info.icon 
              className="w-12 h-12 mx-auto mb-4" 
              style={{ color: themeColors.primaryColor }} 
            />
            <h3 className="text-xl font-semibold mb-2" style={{ color: themeColors.textPrimaryColor }}>
              {info.title}
            </h3>
            <p className="text-gray-600 mb-4" style={{ color: themeColors.textSecondaryColor }}>
              {info.description}
            </p>
            <p className="text-lg font-bold" style={{ color: themeColors.primaryColor }}>
              {info.price}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 bg-white rounded-lg shadow-lg p-6"
        style={{ backgroundColor: themeColors.cardColor }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: themeColors.textPrimaryColor }}>
          Shipping Policy
        </h2>
        <div className="space-y-4" style={{ color: themeColors.textSecondaryColor }}>
          <p>
            We ship to all major cities and regions. Delivery times may vary depending on your location and the shipping method chosen.
          </p>
          <p>
            Orders are typically processed within 24-48 hours of placement. You will receive a tracking number once your order has been shipped.
          </p>
          <p>
            For international orders, please note that additional customs duties and taxes may apply.
          </p>
          <p>
            If you have any questions about shipping, please contact our customer support team.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 