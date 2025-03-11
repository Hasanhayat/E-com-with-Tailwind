import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settingsRef = doc(db, 'settings', 'store');
      const docSnap = await getDoc(settingsRef);
      
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      } else {
        // Initialize with default settings if none exist
        const defaultSettings = {
          storeName: 'Khattak Store',
          storeEmail: '',
          storePhone: '',
          storeAddress: '',
          currency: 'USD',
          taxRate: '0',
          shippingFee: '0',
          freeShippingThreshold: '0',
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
        };
        await setDoc(doc(db, 'settings', 'store'), defaultSettings);
        setSettings(defaultSettings);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      await setDoc(doc(db, 'settings', 'store'), newSettings);
      setSettings(newSettings);
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateSettings,
  };
} 