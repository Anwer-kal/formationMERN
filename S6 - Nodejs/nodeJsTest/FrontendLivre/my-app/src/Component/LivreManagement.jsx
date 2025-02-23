
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, message, Row, Col } from 'antd';
import { addLivre, deleteLivre, fetchLivres } from '../Api/api';

const LivreManagement = () => {
    const [livres, setLivres] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLivre, setCurrentLivre] = useState(null);
    const [form] = Form.useForm();
   //fonction qui recupere la liste des livres
   useEffect(() => {
    const getLivres = async () => {
        try {
            const response = await fetchLivres(); // Récupérer les livres du backend
            console.log("Données des livres :", response); // Vérification des données
            setLivres(response);
        } catch (error) {
            console.error('Erreur lors de la récupération des livres', error);
        }
    };
    getLivres();
}, []);

    const handleAddLivre = () => {
        setCurrentLivre(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditLivre = (livre) => {
        setCurrentLivre(livre);
        form.setFieldsValue(livre);
        setIsModalVisible(true);
    };

    const handleDeleteLivre = async (id) => {
        const previousLivres = [...livres];
        setLivres(livres.filter(livre => livre.id !== id));

        try {
            await deleteLivre(id);
            message.success('Livre supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression du livre', error);
            setLivres(previousLivres);
            message.error('Échec de la suppression du livre');
        }
    };

    const handleSubmit = async (values) => {
        console.log("Données soumises :", values); // Vérifie ce qui est envoyé
    
        if (!values.image) {
            message.error("L'image est obligatoire !");
            return;
        }
    
        if (currentLivre) {
            const updatedLivre = { ...currentLivre, ...values };
            setLivres(livres.map(livre => (livre.id === currentLivre.id ? updatedLivre : livre)));
            try {
                await updatedLivre(currentLivre.id, values);
                message.success('Livre mis à jour avec succès');
                setIsModalVisible(false);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du livre', error);
                message.error('Échec de la mise à jour du livre');
            }
        } else {
            const newLivre = { id: Date.now(), ...values };
            setLivres([...livres, newLivre]);
    
            try {
                await addLivre(values);
                message.success('Livre ajouté avec succès');
                setIsModalVisible(false);
            } catch (error) {
                console.error('Erreur lors de l\'ajout du livre', error);
                message.error('Échec de l\'ajout du livre');
            }
        }
    };
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#ececec', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', color: '#333' }}>Gestion des livres</h2>
            <Button
                type="primary"
                onClick={handleAddLivre}
                style={{
                    background: 'linear-gradient(45deg, #4a90e2, #6a5acd)',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    marginBottom: '20px'
                }}
            >
                Ajouter un livre
            </Button>
            <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'center' }}>
                {livres.map(livre => (
                    <Col key={livre.id} span={8}>
                        <Card
                            title={livre.titre}
                            bordered={false}
                            style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '15px',
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <p><strong>Auteur:</strong> {livre.autre}</p>
                            <p><strong>Nombre de pages:</strong> {livre.nombrePage}</p>
                            <img 
    src={livre.image ? `http://localhost:8000/uploads/${livre.image}` : 'https://via.placeholder.com/150'}  
    alt="Livre" 
    style={{
        width: '100%', 
        height: '180px', 
        objectFit: 'cover', 
        borderRadius: '8px'
    }} 
/>
{/**
<img 
src='http://localhost:8000/uploads/h1.jpg' alt='livre un'
style={{
    width: '100%', 
    height: '180px', 
    objectFit: 'cover', 
    borderRadius: '8px'
}} />
<img 
src='http://localhost:8000/uploads/h2.jpg' alt='livre deux'
style={{
    width: '100%', 
    height: '180px', 
    objectFit: 'cover', 
    borderRadius: '8px'
}} />
<img 
src='http://localhost:8000/uploads/h3.jpg' alt='livre trois'
style={{
    width: '100%', 
    height: '180px', 
    objectFit: 'cover', 
    borderRadius: '8px'
}} /> */}
     
                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <Button 
                                    onClick={() => handleEditLivre(livre)}
                                    style={{
                                        background: '#ffcc00',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Mise à jour
                                </Button>
                                <Button 
                                    onClick={() => handleDeleteLivre(livre.id)}
                                    type="danger"
                                    style={{
                                        background: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title={currentLivre ? 'Modifier livre' : 'Ajouter livre'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form 
                    form={form} 
                    initialValues={{ titre: '', autre: '', nombrePage: '', image: '' }} 
                    onFinish={handleSubmit}
                    style={{ textAlign: 'left' }}
                >
                    <Form.Item name="titre" label="Titre" rules={[{ required: true, message: 'Titre requis' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="autre" label="Auteur" rules={[{ required: true, message: 'Auteur requis' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="nombrePage" label="Nombre de pages" rules={[{ required: true, message: 'Nombre de pages requis' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Image" rules={[{ required: true, message: 'URL requis' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{
                                background: 'linear-gradient(45deg, #4a90e2, #6a5acd)',
                                border: 'none',
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {currentLivre ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>




            
        </div>
    );
};

export default LivreManagement;
