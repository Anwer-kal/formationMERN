// src/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message } from 'antd';
import { fetchUsers, addUser, updateUser, deleteUser } from '../Api/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Fetch users on initial render
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs', error);
            }
        };
        getUsers();
    }, []);

    // Handle adding a user
    const handleAddUser = () => {
        setCurrentUser(null);  // Reset the current user to create a new one
        setIsModalVisible(true);
    };

    // Handle editing a user
    const handleEditUser = (user) => {
        setCurrentUser(user);  // Set the current user to be edited
        setIsModalVisible(true);
    };

    // Handle deleting a user
    const handleDeleteUser = async (id) => {
        const previousUsers = [...users];  // Save the previous state
        setUsers(users.filter(user => user.id !== id));  // Optimistically remove the user from the state

        try {
            await deleteUser(id);  // Call the API to delete the user
            message.success('Utilisateur supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
            setUsers(previousUsers);  // Rollback the state if API fails
            message.error('Échec de la suppression de l\'utilisateur');
        }
    };

    // Handle form submission (add or update user)
    const handleSubmit = async (values) => {
        const previousUsers = [...users];  // Save the previous state

        if (currentUser) {
            // Update user optimistically
            const updatedUser = { ...currentUser, ...values };
            setUsers(users.map(user => (user.id === currentUser.id ? updatedUser : user)));  // Optimistically update the user

            try {
                await updateUser(currentUser.id, values);  // Call the API to update the user
                message.success('Utilisateur mis à jour avec succès');
                setIsModalVisible(false);  // Close the modal
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
                setUsers(previousUsers);  // Rollback if API fails
                message.error('Échec de la mise à jour de l\'utilisateur');
            }
        } else {
            // Add new user optimistically
            const newUser = { id: Date.now(), ...values };  // Use a temporary ID for optimistic update
            setUsers(prevUsers => [...prevUsers, newUser]);  // Optimistically add the user

            try {
                await addUser(values);  // Call the API to add the user
                message.success('Utilisateur ajouté avec succès');
                setIsModalVisible(false);  // Close the modal
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
                setUsers(previousUsers);  // Rollback if API fails
                message.error('Échec de l\'ajout de l\'utilisateur');
            }
        }
    };

    return (
        <div>
            <h2>Gestion des utilisateurs</h2>

            <Button type="primary" onClick={handleAddUser} style={{ marginBottom: 20 }}>
                Ajouter un utilisateur
            </Button>

            <Table
                dataSource={users}
                columns={[
                    { title: 'Nom', dataIndex: 'name', key: 'name' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                    {
                        title: 'Actions',
                        render: (text, record) => (
                            <span>
                                <Button onClick={() => handleEditUser(record)} style={{ marginRight: 10 }}>
                                    Editer
                                </Button>
                                <Button onClick={() => handleDeleteUser(record.id)} type="danger">
                                    Supprimer
                                </Button>
                            </span>
                        ),
                    },
                ]}
                rowKey="id"
            />

            {/* Modal for adding or editing a user */}
            <Modal
                title={currentUser ? 'Modifier utilisateur' : 'Ajouter utilisateur'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={currentUser || { name: '', email: '' }} // Ensure correct initial values for editing
                    onFinish={handleSubmit}
                    key={currentUser ? currentUser.id : 'new'} // Add this key to force re-rendering for editing a user
                >
                    <Form.Item
                        name="name"
                        label="Nom"
                        rules={[{ required: true, message: 'Nom requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Email requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {currentUser ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
