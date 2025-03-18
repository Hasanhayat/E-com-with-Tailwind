/**
 * Store Configuration
 * This file contains all the environment variables and theme settings for the store.
 * Change these variables to customize the store appearance and information.
 */

// Store Information
export const storeInfo = {
  // Basic Info
  name: "Khattak Store",
  tagline: "Premium Quality at Affordable Prices",
  description: "Pakistan's leading online shopping destination offering a wide range of products including clothing, electronics, and more.",
  established: 2023,
  
  // Contact Details
  email: "support@khattakstore.com",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  
  // Social Media
  social: {
    facebook: "https://facebook.com/khattakstore",
    instagram: "https://instagram.com/khattakstore",
    twitter: "https://twitter.com/khattakstore",
    youtube: "https://youtube.com/khattakstore",
  },
  
  // Physical Locations
  locations: [
    {
      id: "isb",
      name: "Islamabad Store",
      address: "F-7 Markaz, Jinnah Super, Islamabad",
      phone: "+92 51 1234567",
      hours: "Mon-Sat: 10:00 AM - 9:00 PM, Sun: 12:00 PM - 6:00 PM",
      coordinates: {
        lat: 33.7294,
        lng: 73.0931,
      }
    },
    {
      id: "lhr",
      name: "Lahore Store",
      address: "M.M Alam Road, Gulberg III, Lahore",
      phone: "+92 42 1234567",
      hours: "Mon-Sat: 10:00 AM - 9:00 PM, Sun: 12:00 PM - 6:00 PM",
      coordinates: {
        lat: 31.5204,
        lng: 74.3587,
      }
    },
    {
      id: "khi",
      name: "Karachi Store",
      address: "Dolmen Mall, Clifton, Karachi",
      phone: "+92 21 1234567",
      hours: "Mon-Sun: 10:00 AM - 10:00 PM",
      coordinates: {
        lat: 24.8607,
        lng: 67.0011,
      }
    }
  ],
  
  // Shipping Information
  shipping: {
    freeShippingThreshold: 3000,
    standardShipping: 150,
    expressShipping: 300,
    sameDayShipping: 500,
    deliveryTimeStandard: "3-5 working days",
    deliveryTimeExpress: "1-2 working days",
    deliveryTimeSameDay: "Same day (orders before 2 PM)",
    internationalShipping: true,
    internationalShippingCountries: ["UAE", "Saudi Arabia", "UK", "USA"],
    internationalShippingCost: 2500,
  },
  
  // Payment Methods
  paymentMethods: [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you receive your order",
      icon: "💰",
      isDefault: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Secure payment with Visa, Mastercard, or other cards",
      icon: "💳",
      isDefault: false,
    },
    {
      id: "easypaisa",
      name: "Easypaisa",
      description: "Pay using your Easypaisa account",
      icon: "📱",
      isDefault: false,
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Pay using your JazzCash account",
      icon: "📱",
      isDefault: false,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct bank transfer to our account",
      icon: "🏦",
      isDefault: false,
      accountDetails: {
        bankName: "HBL",
        accountTitle: "Khattak Store",
        accountNumber: "1234567890",
        iban: "PK36HABB0000123456789000",
      },
    },
  ],
  
  // Return Policy
  returnPolicy: {
    daysToReturn: 7,
    conditions: [
      "Product must be in original packaging",
      "Product must not be used or damaged",
      "Receipt or proof of purchase is required",
      "Some products like undergarments cannot be returned due to hygiene reasons",
    ],
    exchangeAllowed: true,
    refundMethods: ["Original payment method", "Store credit"],
  },
  
  // Customer Support
  customerSupport: {
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    email: "support@khattakstore.com",
    phone: "+92 300 1234567",
    liveChatAvailable: true,
    liveChatHours: "Mon-Fri: 9:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM",
  }
};

// Theme Configuration
export const themeConfig = {
  // Main Colors
  primaryColor: "#f97316", // Orange-600
  secondaryColor: "#374151", // Gray-700
  accentColor: "#3b82f6", // Blue-500
  
  // UI Colors
  backgroundColor: "#f9fafb", // Gray-50
  cardColor: "#ffffff", // White
  textPrimaryColor: "#1f2937", // Gray-800
  textSecondaryColor: "#6b7280", // Gray-500
  
  // Button Styles
  buttonPrimary: {
    background: "#f97316", // Orange-600
    hoverBackground: "#ea580c", // Orange-700
    textColor: "#ffffff", // White
  },
  buttonSecondary: {
    background: "#f3f4f6", // Gray-100
    hoverBackground: "#e5e7eb", // Gray-200
    textColor: "#1f2937", // Gray-800
  },
  
  // Typography
  fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
  headingFontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
  
  // Border Radius
  borderRadiusSmall: "0.25rem", // 4px
  borderRadiusMedium: "0.5rem", // 8px 
  borderRadiusLarge: "1rem", // 16px
  
  // Alternative Themes
  alternativeThemes: {
    dark: {
      primaryColor: "#f97316", // Orange-600
      secondaryColor: "#1f2937", // Gray-800
      backgroundColor: "#111827", // Gray-900
      cardColor: "#1f2937", // Gray-800
      textPrimaryColor: "#f9fafb", // Gray-50
      textSecondaryColor: "#9ca3af", // Gray-400
    },
    blue: {
      primaryColor: "#3b82f6", // Blue-500
      secondaryColor: "#1e3a8a", // Blue-900
      backgroundColor: "#eff6ff", // Blue-50
      cardColor: "#ffffff", // White
      textPrimaryColor: "#1e3a8a", // Blue-900
      textSecondaryColor: "#60a5fa", // Blue-400
    },
    green: {
      primaryColor: "#10b981", // Green-500
      secondaryColor: "#064e3b", // Green-900
      backgroundColor: "#ecfdf5", // Green-50
      cardColor: "#ffffff", // White
      textPrimaryColor: "#064e3b", // Green-900
      textSecondaryColor: "#34d399", // Green-400
    },
    purple: {
      primaryColor: "#8b5cf6", // Purple-500
      secondaryColor: "#4c1d95", // Purple-900
      backgroundColor: "#f5f3ff", // Purple-50
      cardColor: "#ffffff", // White
      textPrimaryColor: "#4c1d95", // Purple-900
      textSecondaryColor: "#a78bfa", // Purple-400
    }
  },
  
  // Seasonal Themes (can be activated during specific seasons/holidays)
  seasonalThemes: {
    eid: {
      primaryColor: "#059669", // Emerald-600
      secondaryColor: "#064e3b", // Emerald-900
      accentColor: "#f59e0b", // Amber-500
      backgroundColor: "#fef3c7", // Amber-100
    },
    ramadan: {
      primaryColor: "#8b5cf6", // Purple-500
      secondaryColor: "#4c1d95", // Purple-900
      accentColor: "#f59e0b", // Amber-500
      backgroundColor: "#f5f3ff", // Purple-50
    },
    independence: {
      primaryColor: "#10b981", // Green-500
      secondaryColor: "#064e3b", // Green-900
      accentColor: "#f3f4f6", // Gray-100
      backgroundColor: "#ecfdf5", // Green-50
    },
    winter: {
      primaryColor: "#0ea5e9", // Sky-500
      secondaryColor: "#0c4a6e", // Sky-900
      accentColor: "#f3f4f6", // Gray-100
      backgroundColor: "#e0f2fe", // Sky-100
    }
  }
};

// Brand Assets
export const brandAssets = {
  logo: "/assets/images/logo.png",
  logoAlt: "/assets/images/logo-alt.png", // Alternative logo (e.g., for dark mode)
  favicon: "/assets/images/favicon.ico",
  ogImage: "/assets/images/og-image.jpg", // Open Graph image for social sharing
};

// SEO Configuration
export const seoConfig = {
  defaultTitle: "Khattak Store - Premium Quality at Affordable Prices",
  titleTemplate: "%s | Khattak Store",
  description: "Pakistan's leading online shopping destination offering a wide range of products including clothing, electronics, and more.",
  canonical: "https://www.khattakstore.com",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.khattakstore.com",
    siteName: "Khattak Store",
  },
  twitter: {
    handle: "@khattakstore",
    site: "@khattakstore",
    cardType: "summary_large_image",
  },
};

// Feature Flags (enables/disables features)
export const featureFlags = {
  enableReviews: true,
  enableWishlist: true,
  enableCompare: true,
  enableLiveChat: true,
  enableNotifications: true,
  enableInternationalShipping: true,
  enableGuestCheckout: true,
  enableCurrencyConverter: false,
  enableSizeGuide: true,
  enableProductZoom: true,
  enable360View: false,
};

// Analytics
export const analyticsConfig = {
  googleAnalyticsId: "G-XXXXXXXXXX",
  facebookPixelId: "XXXXXXXXXX",
}; 