import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or session)
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      const mockUser = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const register = async (userData) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful registration
      const mockUser = {
        id: '1',
        ...userData,
        role: 'user'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 