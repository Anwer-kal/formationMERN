// src/ClientList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Space } from 'antd';
import { fetchClients, createClient, updateClient, deleteClient } from '../BackendCall/clientapi.js';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAllClients();
  }, []);

  const fetchAllClients = async () => {
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch clients!' });
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await updateClient(currentClient._id, values);
        notification.success({ message: 'Client updated successfully!' });
      } else {
        await createClient(values);
        notification.success({ message: 'Client created successfully!' });
      }
      setIsModalVisible(false);
      fetchAllClients();
    } catch (error) {
      notification.error({ message: 'Operation failed' });
    }
  };

  const showModal = (client = null) => {
    setIsEditing(!!client);
    setCurrentClient(client);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this client?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteClient(id);
          notification.success({ message: 'Client deleted successfully!' });
          fetchAllClients();
        } catch (error) {
          notification.error({ message: 'Failed to delete client!' });
        }
      },
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record._id)} disabled={!record._id}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Client List</h1>
      <Button type="primary" onClick={() => showModal()}>Add Client</Button>
      <Table columns={columns} dataSource={clients} rowKey="_id" style={{ marginTop: 20 }} />

      {/* Modal for adding/editing clients */}
      <Modal
        title={isEditing ? 'Edit Client' : 'Add Client'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={isEditing ? { name: currentClient.name, email: currentClient.email, phone: currentClient.phone } : {}}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Client Name"
            name="name"
            rules={[{ required: true, message: 'Please enter client name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter client email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter client phone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? 'Update Client' : 'Add Client'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClientList;
