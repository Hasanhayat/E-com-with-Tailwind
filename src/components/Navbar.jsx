import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  useEffect(() => {
    // Simulate a loading state
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Loader className="animate-spin text-orange-600" size={48} />
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-600">Khattak Store</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Secondary nav */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <ShoppingBag className="h-6 w-6 text-gray-700 hover:text-orange-600" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  // onMouseLeave={() => setIsDropdownOpen(false)}
                  className="relative"
                >
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-600">
                    <User className="h-6 w-6" />
                  </button>
                  {isDropdownOpen && (
                    <div onMouseLeave={() => setIsDropdownOpen(false)} className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 z-50 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {user.role === 'admin' && adminLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {link.name}
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        className="sm:hidden"
      >
        <div className="pt-2 pb-3 space-y-1 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/cart"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartItems.length})
              </Link>
              {user.role === 'admin' && adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-1 px-3 pb-3">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-gray-50 border border-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 text-center text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
} 