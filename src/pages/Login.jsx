import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Loader } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginError, isLoggingIn } = useAuth();
  const { themeColors } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: themeColors.bgColor }}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 
            className="mt-6 text-center text-3xl font-extrabold"
            style={{ color: themeColors.textPrimaryColor }}
          >
            Sign in to your account
          </h2>
          <p 
            className="mt-2 text-center text-sm"
            style={{ color: themeColors.textSecondaryColor }}
          >
            Or{' '}
            <Link 
              to="/register" 
              className="font-medium hover:underline"
              style={{ color: themeColors.primaryColor }}
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div 
            className="rounded-md shadow-sm -space-y-px"
            style={{ borderColor: themeColors.borderColor }}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                style={{ 
                  borderColor: themeColors.borderColor,
                  backgroundColor: themeColors.inputBgColor,
                  color: themeColors.textPrimaryColor 
                }}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
                style={{ 
                  borderColor: themeColors.borderColor,
                  backgroundColor: themeColors.inputBgColor,
                  color: themeColors.textPrimaryColor 
                }}
                placeholder="Password"
              />
            </div>
          </div>

          {loginError && (
            <div className="text-red-500 text-sm text-center">
              {loginError.message}
            </div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoggingIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: isLoggingIn ? themeColors.secondaryColor : themeColors.primaryColor,
                borderColor: themeColors.primaryColor
              }}
            >
              {isLoggingIn ? (
                <span className="flex items-center">
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
} 