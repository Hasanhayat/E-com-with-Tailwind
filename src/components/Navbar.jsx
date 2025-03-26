import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingBag, ShoppingCart, User, Menu, X, Home, Package, Settings, LogOut, Search, Users, List, Heart, Globe, Moon, Sun, Palette } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import { LoadingContext } from '../App';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoading } = useContext(LoadingContext);
  
  // Get theme information from context
  const { store, currentTheme, changeTheme, alternativeThemes, seasonalThemes, themeColors, toggleAutoSeasonalTheme, autoSeasonalTheme } = useTheme();

  // Function to toggle themes dropdown
  const [showThemesDropdown, setShowThemesDropdown] = useState(false);
  
  // Change navbar background on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setShowThemesDropdown(false);
  }, [location.pathname]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Define navigation links for user and admin
  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  // Function to handle theme change
  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setShowThemesDropdown(false);
  };

  // Function to toggle automatic seasonal themes
  const handleToggleAutoTheme = () => {
    toggleAutoSeasonalTheme(!autoSeasonalTheme);
    setShowThemesDropdown(false);
  };

  // Format theme name for display
  const formatThemeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Don't render navbar when loading
  if (isLoading) return null;

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
      style={{
        backgroundColor: themeColors.cardColor,
        color: themeColors.textPrimaryColor
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold" style={{ color: themeColors.primaryColor }}>
            {store.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              {user && user.role === 'admin'
                ? adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center hover:text-orange-600 ${
                        location.pathname === link.path ? 'text-orange-600 font-medium' : ''
                      }`}
                      style={{ 
                        color: location.pathname === link.path ? themeColors.primaryColor : themeColors.textPrimaryColor,
                        ':hover': { color: themeColors.primaryColor }
                      }}
                    >
                      <link.icon className="h-5 w-5 mr-1" />
                      {link.name}
                    </Link>
                  ))
                : navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center hover:text-orange-600 ${
                        location.pathname === link.path ? 'text-orange-600 font-medium' : ''
                      }`}
                      style={{ 
                        color: location.pathname === link.path ? themeColors.primaryColor : themeColors.textPrimaryColor,
                        ':hover': { color: themeColors.primaryColor }
                      }}
                    >
                      <link.icon className="h-5 w-5 mr-1" />
                      {link.name}
                    </Link>
                  ))}
            </div>

            {/* Search, Cart, User */}
            <div className="flex items-center space-x-4">
              {/* Theme button */}
              <div className="relative">
                <button
                  onClick={() => setShowThemesDropdown(!showThemesDropdown)}
                  className="flex items-center p-1 rounded-full hover:bg-gray-100"
                  style={{ ':hover': { backgroundColor: themeColors.backgroundColor } }}
                >
                  <Palette className="h-6 w-6" style={{ color: themeColors.primaryColor }} />
                </button>

                {/* Themes Dropdown */}
                {showThemesDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    style={{ backgroundColor: themeColors.cardColor }}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 text-sm font-medium border-b" style={{ color: themeColors.primaryColor }}>
                        Theme Settings
                      </div>
                      
                      {/* Default theme */}
                      <button
                        onClick={() => handleThemeChange('default')}
                        className={`w-full text-left block px-4 py-2 text-sm ${
                          currentTheme === 'default' ? 'bg-gray-100 font-medium' : ''
                        }`}
                        style={{ 
                          backgroundColor: currentTheme === 'default' ? themeColors.backgroundColor : '',
                          color: themeColors.textPrimaryColor
                        }}
                      >
                        Default
                      </button>
                      
                      {/* Alternative themes section */}
                      <div className="px-4 py-1 text-xs text-gray-500">Alternative Themes</div>
                      {alternativeThemes.map(theme => (
                        <button
                          key={theme}
                          onClick={() => handleThemeChange(theme)}
                          className={`w-full text-left block px-4 py-2 text-sm ${
                            currentTheme === theme ? 'bg-gray-100 font-medium' : ''
                          }`}
                          style={{ 
                            backgroundColor: currentTheme === theme ? themeColors.backgroundColor : '',
                            color: themeColors.textPrimaryColor
                          }}
                        >
                          {formatThemeName(theme)}
                        </button>
                      ))}
                      
                      {/* Seasonal themes section */}
                      <div className="px-4 py-1 text-xs text-gray-500">Seasonal Themes</div>
                      {seasonalThemes.map(theme => (
                        <button
                          key={theme}
                          onClick={() => handleThemeChange(theme)}
                          className={`w-full text-left block px-4 py-2 text-sm ${
                            currentTheme === theme ? 'bg-gray-100 font-medium' : ''
                          }`}
                          style={{ 
                            backgroundColor: currentTheme === theme ? themeColors.backgroundColor : '',
                            color: themeColors.textPrimaryColor
                          }}
                        >
                          {formatThemeName(theme)}
                        </button>
                      ))}
                      
                      {/* Auto-apply seasonal themes toggle */}
                      <div className="px-4 py-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: themeColors.textPrimaryColor }}>Auto-apply seasonal themes</span>
                          <button 
                            onClick={handleToggleAutoTheme}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              autoSeasonalTheme ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span 
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                autoSeasonalTheme ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search */}
              <Link to="/shop" className="p-1 rounded-full hover:bg-gray-100" style={{ ':hover': { backgroundColor: themeColors.backgroundColor } }}>
                <Search className="h-6 w-6" style={{ color: themeColors.textPrimaryColor }} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-1 rounded-full hover:bg-gray-100" style={{ ':hover': { backgroundColor: themeColors.backgroundColor } }}>
                <ShoppingCart className="h-6 w-6" style={{ color: themeColors.textPrimaryColor }} />
                {totalItems > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: themeColors.primaryColor }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center p-1 rounded-full hover:bg-gray-100"
                    style={{ ':hover': { backgroundColor: themeColors.backgroundColor } }}
                  >
                    <User className="h-6 w-6" style={{ color: themeColors.textPrimaryColor }} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      style={{ backgroundColor: themeColors.cardColor }}
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b" style={{ color: themeColors.textSecondaryColor }}>
                          Hi, {user.displayName || user.email}
                        </div>
                        <Link
                          to="/user/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setIsDropdownOpen(false)}
                          style={{ 
                            color: themeColors.textPrimaryColor,
                            ':hover': { backgroundColor: themeColors.backgroundColor }
                          }}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          style={{ 
                            color: themeColors.textPrimaryColor,
                            ':hover': { backgroundColor: themeColors.backgroundColor }
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-gray-600 hover:text-orange-600"
                  style={{ 
                    color: themeColors.textPrimaryColor,
                    ':hover': { color: themeColors.primaryColor }
                  }}
                >
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Cart for Mobile */}
            <Link to="/cart" className="relative p-1 hover:bg-gray-100 rounded-full" style={{ ':hover': { backgroundColor: themeColors.backgroundColor } }}>
              <ShoppingCart className="h-6 w-6" style={{ color: themeColors.textPrimaryColor }} />
              {totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-orange-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                  style={{ backgroundColor: themeColors.primaryColor }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-md focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" style={{ color: themeColors.textPrimaryColor }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: themeColors.textPrimaryColor }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden mt-4 pb-4"
            style={{ backgroundColor: themeColors.cardColor }}
          >
            {/* Navigation Links for Mobile */}
            <div className="flex flex-col space-y-2">
              {user && user.role === 'admin'
                ? adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center px-4 py-2 text-base font-medium hover:bg-gray-50 ${
                        location.pathname === link.path
                          ? 'text-orange-600 bg-gray-50'
                          : 'text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ 
                        color: location.pathname === link.path ? themeColors.primaryColor : themeColors.textPrimaryColor,
                        backgroundColor: location.pathname === link.path ? themeColors.backgroundColor : '',
                        ':hover': { backgroundColor: themeColors.backgroundColor }
                      }}
                    >
                      <link.icon className="h-5 w-5 mr-2" />
                      {link.name}
                    </Link>
                  ))
                : navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center px-4 py-2 text-base font-medium hover:bg-gray-50 ${
                        location.pathname === link.path
                          ? 'text-orange-600 bg-gray-50'
                          : 'text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ 
                        color: location.pathname === link.path ? themeColors.primaryColor : themeColors.textPrimaryColor,
                        backgroundColor: location.pathname === link.path ? themeColors.backgroundColor : '',
                        ':hover': { backgroundColor: themeColors.backgroundColor }
                      }}
                    >
                      <link.icon className="h-5 w-5 mr-2" />
                      {link.name}
                    </Link>
                  ))}

              {/* Theme options for mobile */}
              <div className="px-4 py-2 border-t border-gray-200">
                <p className="text-sm font-medium mb-2" style={{ color: themeColors.primaryColor }}>Theme Options</p>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={() => handleThemeChange('default')}
                    className={`px-3 py-2 text-sm rounded ${
                      currentTheme === 'default' ? 'bg-gray-200 font-medium' : 'bg-gray-100'
                    }`}
                    style={{ 
                      backgroundColor: currentTheme === 'default' ? themeColors.backgroundColor : '',
                      color: themeColors.textPrimaryColor
                    }}
                  >
                    Default
                  </button>
                  {alternativeThemes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`px-3 py-2 text-sm rounded ${
                        currentTheme === theme ? 'bg-gray-200 font-medium' : 'bg-gray-100'
                      }`}
                      style={{ 
                        backgroundColor: currentTheme === theme ? themeColors.backgroundColor : '',
                        color: themeColors.textPrimaryColor
                      }}
                    >
                      {formatThemeName(theme)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm" style={{ color: themeColors.textPrimaryColor }}>Auto seasonal themes</span>
                  <button 
                    onClick={handleToggleAutoTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoSeasonalTheme ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoSeasonalTheme ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Search for Mobile */}
              <Link
                to="/shop"
                className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  color: themeColors.textPrimaryColor,
                  ':hover': { backgroundColor: themeColors.backgroundColor }
                }}
              >
                <Search className="h-5 w-5 mr-2" />
                Search Products
              </Link>

              {/* User links for Mobile */}
              {user ? (
                <>
                  <div className="px-4 py-2 text-base font-medium text-gray-700 border-t border-gray-200" style={{ color: themeColors.textSecondaryColor }}>
                    Account: {user.displayName || user.email}
                  </div>
                  <Link
                    to="/user/orders"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      color: themeColors.textPrimaryColor,
                      ':hover': { backgroundColor: themeColors.backgroundColor }
                    }}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    style={{ 
                      color: themeColors.textPrimaryColor,
                      ':hover': { backgroundColor: themeColors.backgroundColor }
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 border-t border-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: themeColors.textPrimaryColor,
                    ':hover': { backgroundColor: themeColors.backgroundColor }
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 