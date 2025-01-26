import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const AntdForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (values) => {
    message.success(`Form submitted with: 
      Name: ${values.name}, 
      Email: ${values.email}, 
      Message: ${values.message}`);
    setFormData(values); // Mettre à jour les données du formulaire
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Contact Form with Ant Design</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit} // Fonction de soumission
        initialValues={formData}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{  message: 'Please input your name!' }]}
        >
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please input a valid email!' }
          ]}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <Input.TextArea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AntdForm;
