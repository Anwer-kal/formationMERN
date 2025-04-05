import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu theme="dark" mode="horizontal" style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {!isAuthenticated ? (
        <>
          <Menu.Item key="2" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LockOutlined />}>
            <Link to="/forgot-password">Forgot Password</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
            <Link to="/cars">Car Management System</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/privacy">Privacy</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/secret-data">Secret Data</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Button 
              type="primary" 
              icon={<LogoutOutlined />} 
              onClick={handleLogout} 
              style={{ marginLeft: '10px' }}
            >
              Logout
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;