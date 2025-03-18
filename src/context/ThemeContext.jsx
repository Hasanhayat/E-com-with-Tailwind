import React, { createContext, useState, useContext, useEffect } from 'react';
import { storeInfo, themeConfig } from '../config/storeConfig';

// Create Theme Context
export const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Current theme state
  const [currentTheme, setCurrentTheme] = useState('default');
  const [themeColors, setThemeColors] = useState({
    primaryColor: themeConfig.primaryColor,
    secondaryColor: themeConfig.secondaryColor,
    accentColor: themeConfig.accentColor,
    backgroundColor: themeConfig.backgroundColor,
    cardColor: themeConfig.cardColor,
    textPrimaryColor: themeConfig.textPrimaryColor,
    textSecondaryColor: themeConfig.textSecondaryColor,
  });

  // State for store information
  const [store, setStore] = useState(storeInfo);

  // Function to change theme
  const changeTheme = (themeName) => {
    if (themeName === 'default') {
      setThemeColors({
        primaryColor: themeConfig.primaryColor,
        secondaryColor: themeConfig.secondaryColor,
        accentColor: themeConfig.accentColor,
        backgroundColor: themeConfig.backgroundColor,
        cardColor: themeConfig.cardColor,
        textPrimaryColor: themeConfig.textPrimaryColor,
        textSecondaryColor: themeConfig.textSecondaryColor,
      });
    } else if (themeConfig.alternativeThemes[themeName]) {
      setThemeColors({
        ...themeColors,
        ...themeConfig.alternativeThemes[themeName],
      });
    } else if (themeConfig.seasonalThemes[themeName]) {
      setThemeColors({
        ...themeColors,
        ...themeConfig.seasonalThemes[themeName],
      });
    }
    
    setCurrentTheme(themeName);
    // Save user preference to localStorage
    localStorage.setItem('preferredTheme', themeName);
  };

  // Function to check if a seasonal theme should be applied based on date
  const checkSeasonalTheme = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth(); // 0-11
    const day = currentDate.getDate(); // 1-31
    
    // Check if it's Ramadan (approximate dates for 2023, would need to be updated annually)
    // For a real app, you would need a more sophisticated calculation for Islamic calendar
    if (month === 2 && day >= 22 || month === 3 && day <= 21) { // March 22 - April 21, 2023
      return 'ramadan';
    }
    
    // Check if it's close to Eid (approximate dates)
    if (month === 3 && day >= 22 && day <= 27) { // April 22-27, 2023 (Eid al-Fitr)
      return 'eid';
    }
    if (month === 5 && day >= 28 || month === 6 && day <= 2) { // June 28 - July 2, 2023 (Eid al-Adha)
      return 'eid';
    }
    
    // Check if it's Independence Day (August 14)
    if (month === 7 && day === 14) { // August 14
      return 'independence';
    }
    
    // Check if it's winter (December - February)
    if (month === 11 || month === 0 || month === 1) {
      return 'winter';
    }
    
    return null;
  };

  // Function to update store information
  const updateStoreInfo = (newStoreInfo) => {
    setStore({
      ...store,
      ...newStoreInfo,
    });
  };

  // Apply seasonal theme if auto seasonal themes is enabled
  useEffect(() => {
    // Check if user has a preferred theme saved
    const savedTheme = localStorage.getItem('preferredTheme');
    
    // Check if autoSeasonalTheme is enabled
    const autoSeasonalTheme = localStorage.getItem('autoSeasonalTheme') === 'true';
    
    if (savedTheme && savedTheme !== 'default' && !autoSeasonalTheme) {
      changeTheme(savedTheme);
    } else if (autoSeasonalTheme) {
      const seasonalTheme = checkSeasonalTheme();
      if (seasonalTheme) {
        changeTheme(seasonalTheme);
      }
    }
    
    // Set up an interval to check for seasonal themes daily
    const intervalId = setInterval(() => {
      const autoSeasonalThemeEnabled = localStorage.getItem('autoSeasonalTheme') === 'true';
      if (autoSeasonalThemeEnabled) {
        const theme = checkSeasonalTheme();
        if (theme && theme !== currentTheme) {
          changeTheme(theme);
        } else if (!theme && currentTheme !== 'default' && currentTheme !== savedTheme) {
          // If no seasonal theme is applicable and current theme is seasonal, revert to user preference or default
          changeTheme(savedTheme || 'default');
        }
      }
    }, 86400000); // Check once per day
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentTheme]);

  // Toggle automatic seasonal themes
  const toggleAutoSeasonalTheme = (enable) => {
    if (enable) {
      localStorage.setItem('autoSeasonalTheme', 'true');
      const seasonalTheme = checkSeasonalTheme();
      if (seasonalTheme) {
        changeTheme(seasonalTheme);
      }
    } else {
      localStorage.setItem('autoSeasonalTheme', 'false');
      // Revert to user's preferred theme
      const savedTheme = localStorage.getItem('preferredTheme');
      if (savedTheme) {
        changeTheme(savedTheme);
      } else {
        changeTheme('default');
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeColors,
        changeTheme,
        alternativeThemes: Object.keys(themeConfig.alternativeThemes),
        seasonalThemes: Object.keys(themeConfig.seasonalThemes),
        toggleAutoSeasonalTheme,
        autoSeasonalTheme: localStorage.getItem('autoSeasonalTheme') === 'true',
        store,
        updateStoreInfo,
      }}
    >
      <div style={{ 
        '--primary-color': themeColors.primaryColor,
        '--secondary-color': themeColors.secondaryColor,
        '--accent-color': themeColors.accentColor,
        '--background-color': themeColors.backgroundColor,
        '--card-color': themeColors.cardColor,
        '--text-primary-color': themeColors.textPrimaryColor,
        '--text-secondary-color': themeColors.textSecondaryColor,
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}; 