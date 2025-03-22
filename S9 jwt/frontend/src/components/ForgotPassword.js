import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import {api} from '../api';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.post('/auth/forgot-password', values);
            message.success('Un lien de réinitialisation a été envoyé à votre email');
        } catch (error) {
            message.error(error.response?.data?.message || 'Erreur serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <h2>Mot de passe oublié</h2>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Envoyer le lien
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;
