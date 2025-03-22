import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { Loader } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register, registerError, isRegistering } = useAuth();
  const { themeColors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
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
            Create your account
          </h2>
          <p 
            className="mt-2 text-center text-sm"
            style={{ color: themeColors.textSecondaryColor }}
          >
            Or{' '}
            <Link 
              to="/login" 
              className="font-medium hover:underline"
              style={{ color: themeColors.primaryColor }}
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div 
            className="rounded-md shadow-sm -space-y-px"
            style={{ borderColor: themeColors.borderColor }}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                style={{ 
                  borderColor: themeColors.borderColor,
                  backgroundColor: themeColors.inputBgColor,
                  color: themeColors.textPrimaryColor 
                }}
                placeholder="Full Name"
              />
            </div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm"
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
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm"
                style={{ 
                  borderColor: themeColors.borderColor,
                  backgroundColor: themeColors.inputBgColor,
                  color: themeColors.textPrimaryColor 
                }}
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
                style={{ 
                  borderColor: themeColors.borderColor,
                  backgroundColor: themeColors.inputBgColor,
                  color: themeColors.textPrimaryColor 
                }}
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {registerError && (
            <div className="text-red-500 text-sm text-center">
              {registerError.message}
            </div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isRegistering}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: isRegistering ? themeColors.secondaryColor : themeColors.primaryColor,
                borderColor: themeColors.primaryColor
              }}
            >
              {isRegistering ? (
                <span className="flex items-center">
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
} 