// src/ProductList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, notification } from 'antd';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../BackendCall/api.js';  // Import API functions

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch products!' });
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await updateProduct(currentProduct._id, values);
        notification.success({ message: 'Product updated successfully!' });
      } else {
        await createProduct(values);
        notification.success({ message: 'Product created successfully!' });
      }
      setIsModalVisible(false);
      fetchAllProducts();
    } catch (error) {
      notification.error({ message: 'Operation failed' });
    }
  };

  const showModal = (product = null) => {
    setIsEditing(!!product);
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteProduct(id);
          notification.success({ message: 'Product deleted successfully!' });
          fetchAllProducts();
        } catch (error) {
          notification.error({ message: 'Failed to delete product!' });
        }
      },
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
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
      <h1>Product List</h1>
      <Button type="primary" onClick={() => showModal()}>Add Product</Button>
      <Table columns={columns} dataSource={products} rowKey="_id" style={{ marginTop: 20 }} />

      {/* Modal for adding/editing products */}
      <Modal
  title={isEditing ? 'Edit Product' : 'Add Product'}
  open={isModalVisible}  // Updated for Ant Design v5
  onCancel={() => setIsModalVisible(false)}
  footer={null}
>
        <Form
          initialValues={isEditing ? { name: currentProduct.name, price: currentProduct.price, description: currentProduct.description } : {}}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please enter product name!' }]} 
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter product price!' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter product description!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
