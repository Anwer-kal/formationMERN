import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Form, message, Card, Row, Col, Image, Upload } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const BooksManagement = () => {
    const [books, setBooks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    // Récupérer les livres depuis le backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/books');
                console.log(response.data)
                setBooks(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des livres', error);
            }
        };
        fetchBooks();
    }, []);

    // Ajouter un livre
    const handleAddBook = () => {
        setCurrentBook(null);
        setIsModalVisible(true);
    };

    // Modifier un livre
    const handleEditBook = (book) => {
        setCurrentBook(book);
        setIsModalVisible(true);
    };

    // Supprimer un livre
    const handleDeleteBook = async (id) => {
        const previousBooks = [...books];
        setBooks(books.filter(book => book.id !== id));

        try {
            await axios.delete(`http://localhost:8000/books/${id}`);
            message.success('Livre supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression du livre', error);
            setBooks(previousBooks);
            message.error('Échec de la suppression du livre');
        }
    };

    // Soumettre le formulaire pour ajouter ou modifier un livre
    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);

        // Si une image a été téléchargée, on l'ajoute au formData
        if (values.image && values.image.fileList[0]) {
            formData.append("image", values.image.fileList[0].originFileObj);
        }

        const previousBooks = [...books];
        
        if (currentBook) {
            try {
                await axios.put(`http://localhost:8000/books/${currentBook.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const updatedBook = { ...currentBook, ...values };
                setBooks(books.map(book => (book.id === currentBook.id ? updatedBook : book)));
                message.success('Livre mis à jour avec succès');
                setIsModalVisible(false);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du livre', error);
                setBooks(previousBooks);
                message.error('Échec de la mise à jour du livre');
            }
        } else {
            try {
                await axios.post('http://localhost:8000/books', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const newBook = { id: Date.now(), ...values };
                setBooks([...books, newBook]);
                message.success('Livre ajouté avec succès');
                setIsModalVisible(false);
            } catch (error) {
                console.error('Erreur lors de l\'ajout du livre', error);
                setBooks(previousBooks);
                message.error('Échec de l\'ajout du livre');
            }
        }
    };

    return (
        <div>
            <h2>Gestion des livres</h2>
            <Button type="primary" onClick={handleAddBook} style={{ marginBottom: 20 }}>
                Ajouter un livre
            </Button>

            {/* Affichage des livres sous forme de cartes */}
            <Row gutter={[16, 16]}>
                {books.map((book) => (
                    <Col span={8} key={book.id}>
                        <Card 
                             style={{ border: '2px solid #d9d9d9' }}
                            title={book.title}
                            extra={
                                <span>
                                    <Button onClick={() => handleEditBook(book)} style={{ marginRight: 10 }}>
                                        Éditer
                                    </Button>
                                    <Button onClick={() => handleDeleteBook(book.id)} type="danger">
                                        Supprimer
                                    </Button>
                                </span>
                            }
                        >
                            <p>Auteur: {book.author}</p>
                            <Image  
                    src={`http://localhost:8000/uploads/${book.imageUrl}`} 
                    style={{ width: '300px', height: '900px' ,display: 'flex'}} 
                    alt=""
                   
                />

                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal pour ajouter ou modifier un livre */}
            <Modal
                title={currentBook ? 'Modifier livre' : 'Ajouter livre'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={currentBook || { title: '', author: '' }}
                    onFinish={handleSubmit}
                    key={currentBook ? currentBook.id : 'new'}
                >
                    <Form.Item
                        name="title"
                        label="Titre"
                        rules={[{ required: true, message: 'Titre requis' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Auteur"
                        rules={[{ required: true, message: 'Auteur requis' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="file"
                    >
                        <Upload 
                            name="image"  
                        >
                            <Button icon={<UploadOutlined />}>Cliquez pour télécharger</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {currentBook ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BooksManagement;
