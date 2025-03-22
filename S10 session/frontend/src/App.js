import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Button, Spin } from 'antd';
import axios from 'axios';
import Navbar from './components/Navbar';
import PrivacyPage from './components/PrivacyPage';
import SecretDataPage from './components/SecretDataPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Cars from './components/CarList';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null to indicate loading state
  const navigate = useNavigate();

  // Check session on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check-session', { withCredentials: true });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Login handler
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Show a loading spinner while checking session
  if (isAuthenticated === null) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        {isAuthenticated && (
          <Button type="primary" onClick={handleLogout} style={{ marginRight: 16 }}>
            Logout
          </Button>
        )}
      </Header>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<>404 page not exist</>} />

            {/* Protected Routes */}
            <Route path="/cars" element={<ProtectedRoute element={<Cars />} isAuthenticated={isAuthenticated} />} />
            <Route path="/privacy" element={<ProtectedRoute element={<PrivacyPage />} isAuthenticated={isAuthenticated} />} />
            <Route path="/secret-data" element={<ProtectedRoute element={<SecretDataPage />} isAuthenticated={isAuthenticated} />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MyApp ©2025 Created with Ant Design</Footer>
    </Layout>
  );
};

export default App;
