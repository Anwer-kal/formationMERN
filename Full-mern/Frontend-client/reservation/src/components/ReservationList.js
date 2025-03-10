import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Space, DatePicker } from 'antd';
import { fetchReservations, createReservation, updateReservation, deleteReservation } from '../BackendCall/reservationapi.js';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [dates, setDates] = useState([null, null]);
  const onDateChange = (dates) => {
    setDates(dates);
  };
  
  const disabledEndDate = (current) => {
    return dates[0] && current && current.isBefore(dates[0], 'day');
  };
  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch reservations!' });
    }
  };

  const handleSubmit = async (values) => {
    try {
      const [startDate, endDate] = values.date|| [];
      // Format the dates to 'YYYY-MM-DD'
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
      console.log(formattedStartDate  , formattedEndDate)
      const reservationData = {
        ...values,
        startDate:formattedStartDate,
                endDate:formattedEndDate}

      if (isEditing) {
        await updateReservation(currentReservation._id, reservationData);
        notification.success({ message: 'Reservation updated successfully!' });
      } else {
        await createReservation(reservationData);
        notification.success({ message: 'Reservation created successfully!' });
      }
      setIsModalVisible(false);
      fetchAllReservations();
    } catch (error) {
      notification.error({ message: 'Operation failed' });
    }
  };

  const showModal = (reservation = null) => {
    setIsEditing(!!reservation);
    setCurrentReservation(reservation);

    if (reservation) {
      form.setFieldsValue({
        clientName: reservation.clientName,
        date: reservation.date
          ? [moment(reservation.date[0]), moment(reservation.date[1])]
          : undefined,
        status: reservation.status,
      });
    } else {
      form.resetFields();
    }

    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this reservation?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteReservation(id);
          notification.success({ message: 'Reservation deleted successfully!' });
          fetchAllReservations();
        } catch (error) {
          notification.error({ message: 'Failed to delete reservation!' });
        }
      },
    });
  };

  const columns = [
    { title: 'Client', dataIndex: 'clientName', key: 'clientName' },
    { 
      title: 'startDate', 
      dataIndex: 'startDate', 
      key: 'startDate',
    },
    { 
      title: 'endDate', 
      dataIndex: 'endDate', 
      key: 'endDate',
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
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
      <h1>Reservation List</h1>
      <Button type="primary" onClick={() => showModal()}>Add Reservation</Button>
      <Table columns={columns} dataSource={reservations} rowKey="_id" style={{ marginTop: 20 }} />

      {/* Modal for adding/editing reservations */}
      <Modal
        title={isEditing ? 'Edit Reservation' : 'Add Reservation'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[{ required: true, message: 'Please enter client name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reservation Date"
            name="date"
            rules={[{ required: true, message: 'Please select a reservation date range!' }]}
          >
            <RangePicker
          format="YYYY-MM-DD"
          onChange={onDateChange}
        />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please enter reservation status!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? 'Update Reservation' : 'Add Reservation'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReservationList;
