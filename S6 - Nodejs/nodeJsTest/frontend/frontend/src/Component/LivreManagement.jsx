// src/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Modal, Form, message } from 'antd';
import { fetchLivres, addLivre, upadteLivre, deleteLivre, fetchLivres, addLivre } from '../Api/api';

const LivreManagement = () => {
    const [livres, setLivres] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLivre, setCurrentLivre] = useState(null);

    // Fetch users on initial render
    useEffect(() => {
        const getLivres = async () => {
            try {
                const response = await fetchLivres();
                setLivres(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des Livres', error);
            }
        };
        getLivres();
    }, []);

    // Handle adding a livres
    const handleAddLivre = () => {
        setCurrentLivre(null);  
        setIsModalVisible(true);
    };

    // Handle editing a livre
    const handleEditLivre = (livre) => {
        setCurrentLivre(livre);  
        setIsModalVisible(true);
    };

    // Handle deleting a livre
    const handleDeleteLivre = async (id) => {
        const previousLivres = [...livres]; 
        setLivres(livres.filter(livre => livre.id !== id)); 

        try {
            await deleteLivre(id);  
            message.success('livre supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression un livre', error);
            setLivres(previouslivres);  
            message.error('Échec de la suppression de livres');
        }
    };

    // Handle form submission 
    const handleSubmit = async (values) => {
        const previouslivres = [...livres];  // Save the previous state

        if (currentLivre) {
            
            const upadteLivre= { ...currentLivre, ...values };
            setLivres(livres.map(livre => (livre.id === currentLivre.id ? upadteLivre: livre))); 

            try {
                await upadteLivre(currentLivre.id, values);  
                message.success('livre mis à jour avec succès');
                setIsModalVisible(false); 
            } catch (error) {
                console.error('Erreur lors de la mise à jour de livres', error);
               setLivres(previousLivres);  
                message.error('Échec de la mise à jour de livres');
            }
        } else {
           
            const newLivre = { id: Date.now(), ...values };  
            setLivres(prevLivres => [...prevLivres, newLivre]); 

            try {
                await addLivre(values);  
                message.success('Livre ajouté avec succès');
                setIsModalVisible(false);  // Close the modal
            } catch (error) {
                console.error('Erreur lors de l\'ajout de livre', error);
                setLivres(previouslivres);  // Rollback if API fails
                message.error('Échec de l\'ajout de livre');
            }
        }
    };
    return(
        <>
        <div>
            <h2>Gestion des livres </h2>
            <Button type="primary" onClick={handleAddLivre} style={{ marginBottom: 20 }}>
                Ajouter un livre
            </Button>
            <Card
                dataSource={livres}
                p={[
                    { title: 'Title', dataIndex: 'titre', key: 'titre' },
                    { title: 'Other', dataIndex: 'autre', key: 'autre' },
                    { title: 'Number of Pages', dataIndex: 'nombrePage', key: 'nombrePage' },
                    { title: 'Picture', dataIndex: 'image', key: 'image' },
                    {
                        title: 'Actions',
                        render: (text, record) => (
                            <span>
                                <Button onClick={() => handleEditLivre(record)} style={{ marginRight: 10 }}>
                                  mise a jour 
                                </Button>
                                <Button onClick={() => handleDeleteLivre(record.id)} type="danger">
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
                title={currentLivre ? 'Modifier livre' : 'Ajouter livre'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={currentLivre || { titre: '', autre: '',nombrePage: '', image :''}} 
                    onFinish={handleSubmit}
                    key={currentLivre ? currentLivre.id : 'new'} 
                >
                    <Form.Item
                        name="titre"
                        label="Title"
                        rules={[{ required: true, message: 'title requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="autre"
                        label="Other"
                        rules={[{ required: true, message: 'other requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nombrePage"
                        label="Number of Pages"
                        rules={[{ required: true, message: 'number of pages requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image" 
                        label="Picture"
                        rules={[{ required: true, message: 'url requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {currentLivre ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
 
        </div>
        </>
    )
};
export default LivreManagement;
