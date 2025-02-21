// src/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Card , Button, Input, Modal, Form, message } from 'antd';
import { fetchBook, addBook, updateBook, deleteBook } from '../Api/api';
import img from '../logo192.png';
const { Meta } = Card;
const UserManagement = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    // Fetch data on initial render
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchBook();
                setData(response);
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
        const previousUsers = [...data];  // Save the previous state
        setData(data.filter(user => user.id !== id));  // Optimistically remove the user from the state

        try {
            await deleteBook(id);  // Call the API to delete the user
            message.success('Utilisateur supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
            setData(previousUsers);  // Rollback the state if API fails
            message.error('Échec de la suppression de l\'utilisateur');
        }
    };

    // Handle form submission (add or update user)
    const handleSubmit = async (values) => {
        const previousUsers = [...data];  // Save the previous state

        if (currentUser) {
            // Update user optimistically
            const updatedUser = { ...currentUser, ...values };
            setData(data.map(user => (user.id === currentUser.id ? updatedUser : user)));  // Optimistically update the user

            try {
                await updateBook(currentUser.id, values);  // Call the API to update the user
                message.success('Utilisateur mis à jour avec succès');
                setIsModalVisible(false);  // Close the modal
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
                setData(previousUsers);  // Rollback if API fails
                message.error('Échec de la mise à jour de l\'utilisateur');
            }
        } else {
            // Add new user optimistically
            const newUser = { id: Date.now(), ...values };  // Use a temporary ID for optimistic update
            setData(prevUsers => [...prevUsers, newUser]);  // Optimistically add the user

            try {
                await addBook(values);  // Call the API to add the user
                message.success('Utilisateur ajouté avec succès');
                setIsModalVisible(false);  // Close the modal
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
                setData(previousUsers);  // Rollback if API fails
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

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {data.map((item) => (
                    <Card
                        key={item.id}
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt={item.book_name} src={item.image} />}
                    >
                        <Meta title={item.book_name} description={item.kateb_name} />
                    </Card>
                ))}
            </div>

            {/* Modal for adding or editing a user */}
            <Modal
                title={currentUser ? 'Modifier utilisateur' : 'Ajouter utilisateur'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={currentUser || { name: '', email: '', image: '' }} // Valeurs initiales
                    onFinish={handleSubmit}
                    key={currentUser ? currentUser.id : 'new'} // Pour forcer le re-render lors de la modification
                >
                    <Form.Item
                        name="name"
                        label="Book Name"
                        rules={[{ required: true, message: 'Nom requis' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Kateb Name"
                        rules={[{ required: true, message: 'Nom de l\'auteur requis' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image"
                        rules={[{ required: true, message: 'Image requise' }]}
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
