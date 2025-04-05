import React, { useState } from 'react';
import { Input, Button, Form, message, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const { Text } = Typography;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await dispatch(login(values))
      message.success('Connexion réussie');
      navigate('/');
    } catch (error) {
      message.error(error?.message || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card
        style={{ width: 400, padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
        title={<h2 style={{ textAlign: 'center' }}>Se connecter</h2>}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Adresse email"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mot de passe"
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mot de passe"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ borderRadius: '8px', backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
          >
            Se connecter
          </Button>
        </Form>

        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Text
            onClick={() => navigate('/register')}
            style={{ cursor: 'pointer', color: '#1890ff' }}
          >
            Pas encore inscrit ? Créez un compte
          </Text>
          <br />
          <Text
            onClick={() => navigate('/forgot-password')}
            style={{ cursor: 'pointer', color: '#1890ff' }}
          >
            Mot de passe oublié ?
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
