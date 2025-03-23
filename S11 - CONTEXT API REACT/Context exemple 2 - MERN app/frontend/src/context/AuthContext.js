import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to indicate loading
  const navigate = useNavigate();

  // Check authentication state on app load
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false); // No token, user is not authenticated
        return;
      }

      try {
        // Verify the token with the backend
        const response = await axios.get('http://localhost:5000/auth/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.authenticated) {
          setIsAuthenticated(true); // Token is valid, user is authenticated
        } else {
          setIsAuthenticated(false); // Token is invalid, user is not authenticated
        }
      } catch (error) {
        console.error('Error verifying token', error);
        setIsAuthenticated(false); // Error occurred, assume user is not authenticated
      }
    };

    checkSession();
  }, []);

  // Login function
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;