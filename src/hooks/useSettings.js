import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch settings from localStorage
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const savedSettings = localStorage.getItem('storeSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      } else {
        // Default settings
        const defaultSettings = {
          storeName: 'My Store',
          storeEmail: 'contact@mystore.com',
          storePhone: '+1 234 567 8900',
          storeAddress: '123 Store Street, City, Country',
          currency: 'USD',
          taxRate: '10',
          shippingFee: '5',
          freeShippingThreshold: '50',
          socialLinks: {
            facebook: '',
            instagram: '',
            twitter: '',
          },
          paymentMethods: {
            stripe: true,
            paypal: false,
            cod: true,
          },
          seo: {
            metaTitle: 'My Store - Your One-Stop Shop',
            metaDescription: 'Discover our collection of high-quality products at great prices.',
            keywords: 'store, products, shopping, online store',
            ogImage: '',
            ogDescription: '',
          }
        };
        setSettings(defaultSettings);
        localStorage.setItem('storeSettings', JSON.stringify(defaultSettings));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update settings
  const updateSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      localStorage.setItem('storeSettings', JSON.stringify(newSettings));
      return newSettings;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    fetchSettings
  };
}; 