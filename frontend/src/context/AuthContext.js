import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/me', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Check if there's a Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');

    if (authSuccess === 'true') {
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      // Immediately check auth status after Google callback
      checkAuthStatus();
    } else {
      checkAuthStatus();
    }
  }, []);

  // Login method
  const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    setUser(response.data.user);
    return response.data;
  };

  // Register method
  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    setUser(response.data.user);
    return response.data;
  };

  // Logout method
  const logout = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true });
      // Clear all cookies
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')  // Remove leading spaces from the cookie name
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`); // Set the cookie's value to an expired date
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if API call fails
      setUser(null);
    }
  };

  // Add Google login method
  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, googleLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw an error if used outside of AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
}