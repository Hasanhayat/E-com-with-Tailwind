import React, { createContext, useState, useContext, useEffect } from 'react';

const themeOptions = {
  light: {
    name: 'light',
    primaryColor: '#f97316', // Orange-500
    secondaryColor: '#ea580c', // Orange-600
    textPrimaryColor: '#1f2937', // Gray-800
    textSecondaryColor: '#4b5563', // Gray-600
    bgColor: '#ffffff',
    bgSecondaryColor: '#f9fafb', // Gray-50
    cardBgColor: '#ffffff',
    borderColor: '#e5e7eb', // Gray-200
    inputBgColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  },
  dark: {
    name: 'dark',
    primaryColor: '#f97316', // Orange-500
    secondaryColor: '#ea580c', // Orange-600
    textPrimaryColor: '#f9fafb', // Gray-50
    textSecondaryColor: '#d1d5db', // Gray-300
    bgColor: '#111827', // Gray-900
    bgSecondaryColor: '#1f2937', // Gray-800
    cardBgColor: '#1f2937', // Gray-800
    borderColor: '#374151', // Gray-700
    inputBgColor: '#374151', // Gray-700
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  },
  forest: {
    name: 'forest',
    primaryColor: '#10b981', // Emerald-500
    secondaryColor: '#059669', // Emerald-600
    textPrimaryColor: '#1f2937', // Gray-800
    textSecondaryColor: '#4b5563', // Gray-600
    bgColor: '#ecfdf5', // Emerald-50
    bgSecondaryColor: '#d1fae5', // Emerald-100
    cardBgColor: '#ffffff',
    borderColor: '#a7f3d0', // Emerald-200
    inputBgColor: '#ffffff',
    shadowColor: 'rgba(16, 185, 129, 0.1)'
  },
  ocean: {
    name: 'ocean',
    primaryColor: '#0ea5e9', // Sky-500
    secondaryColor: '#0284c7', // Sky-600
    textPrimaryColor: '#0c4a6e', // Sky-900
    textSecondaryColor: '#0369a1', // Sky-700
    bgColor: '#f0f9ff', // Sky-50
    bgSecondaryColor: '#e0f2fe', // Sky-100
    cardBgColor: '#ffffff',
    borderColor: '#bae6fd', // Sky-200
    inputBgColor: '#ffffff',
    shadowColor: 'rgba(14, 165, 233, 0.1)'
  },
  sunset: {
    name: 'sunset',
    primaryColor: '#f43f5e', // Rose-500
    secondaryColor: '#e11d48', // Rose-600
    textPrimaryColor: '#1f2937', // Gray-800
    textSecondaryColor: '#4b5563', // Gray-600
    bgColor: '#fff1f2', // Rose-50
    bgSecondaryColor: '#ffe4e6', // Rose-100
    cardBgColor: '#ffffff',
    borderColor: '#fecdd3', // Rose-200
    inputBgColor: '#ffffff',
    shadowColor: 'rgba(244, 63, 94, 0.1)'
  }
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const themeColors = themeOptions[theme] || themeOptions.light;

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themeOptions[savedTheme]) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use dark theme if user prefers dark color scheme
      setTheme('dark');
    }
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const changeTheme = (newTheme) => {
    if (themeOptions[newTheme]) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 