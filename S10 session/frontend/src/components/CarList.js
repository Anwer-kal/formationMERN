import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getCars, createCar, updateCar, deleteCar } from '../api';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const carsData = await getCars();
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleAddCar = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleEditCar = (car) => {
    setCurrentCar(car);
    setIsEditMode(true);
    form.setFieldsValue(car);
    setIsModalVisible(true);
  };

  const handleDeleteCar = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this car?',
      onOk: async () => {
        try {
          await deleteCar(id);
          setCars(cars.filter(car => car._id !== id));
          message.success('Car deleted successfully');
        } catch (error) {
          console.error('Error deleting car:', error);
          message.error('Failed to delete car');
        }
      },
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEditMode) {
        // Update car
        await updateCar(currentCar._id, values);
        setCars(cars.map(car => (car._id === currentCar._id ? { ...car, ...values } : car)));
        message.success('Car updated successfully');
      } else {
        // Add new car
        const newCar = await createCar(values);
        setCars([...cars, newCar]);
        message.success('Car added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving car:', error);
      message.error('Failed to save car');
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddCar}
        style={{ marginBottom: '20px' }}
      >
        Add Car
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cars.map((car) => (
          <Card
            key={car._id}
            hoverable
            style={{ width: 240, margin: '10px' }}
            cover={<img alt={car.make} src={car.image || 'https://via.placeholder.com/150'} />}
            actions={[
              <EditOutlined key="edit" onClick={() => handleEditCar(car)} />,
              <DeleteOutlined key="delete" onClick={() => handleDeleteCar(car._id)} />,
            ]}
          >
            <Card.Meta title={`${car.make} ${car.model}`} description={`Year: ${car.year} | Price: $${car.price}`} />
          </Card>
        ))}
      </div>

      {/* Modal for Add/Edit Car */}
      <Modal
        title={isEditMode ? 'Edit Car' : 'Add Car'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label="Make"
            name="make"
            rules={[{ required: true, message: 'Please enter the car make' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please enter the car model' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: 'Please enter the car year' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the car price' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: 'Please enter the image URL' }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CarList;
