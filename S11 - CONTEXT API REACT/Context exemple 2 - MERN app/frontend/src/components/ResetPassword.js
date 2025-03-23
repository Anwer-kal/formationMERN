import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import {api} from '../api';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useParams();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.post(`/auth/reset-password/${token}`, values);
            message.success('Mot de passe réinitialisé');
        } catch (error) {
            message.error(error.response?.data?.message || 'Erreur serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <h2>Réinitialiser le mot de passe</h2>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Veuillez entrer un nouveau mot de passe!' }]}
                >
                    <Input.Password placeholder="Nouveau mot de passe" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Réinitialiser
                </Button>
            </Form>
        </div>
    );
};

export default ResetPassword;
