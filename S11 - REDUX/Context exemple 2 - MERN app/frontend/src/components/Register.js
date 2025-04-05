import React, { useState } from 'react';
import { Input, Button, Form, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import {api} from '../api';

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.post('/auth/register', values);
            message.success('Inscription réussie');
            navigate('/login');
        } catch (error) {
            message.error(error.response?.data?.message || 'Erreur serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <Card
                style={{ width: 400, padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                title={<h2 style={{ textAlign: 'center' }}>S'inscrire</h2>}
            >
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Nom d'utilisateur" 
                            style={{ borderRadius: '8px' }} 
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
                    >
                        <Input 
                            prefix={<MailOutlined />} 
                            placeholder="Email" 
                            style={{ borderRadius: '8px' }} 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
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
                        S'inscrire
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;
