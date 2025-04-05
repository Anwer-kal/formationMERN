import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import PrivacyPage from './components/PrivacyPage';
import SecretDataPage from './components/SecretDataPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Cars from './components/CarList';
import CarNumber from './components/CarNumber';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { verifyToken } from './redux/authSlice'; // adjust path if needed
const { Header, Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  if (status === 'loading' || isAuthenticated === null) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Navbar />
      </Header>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<>404 page not exist</>} />

            {/* Protected Routes */}
            <Route
              path="/cars"
              element={isAuthenticated ? <Cars /> : <Navigate to="/login" />}
            />
            <Route
              path="/privacy"
              element={isAuthenticated ? <PrivacyPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/secret-data"
              element={isAuthenticated ? <SecretDataPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Content>
      <CarNumber />
      <Footer style={{ textAlign: 'center' }}>MyApp ©2025 Created with Ant Design</Footer>
    </Layout>
  );
};

export default App;