// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Fonction pour récupérer les livres
export const fetchBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
    }
};

// Fonction pour ajouter un livre
export const addBook = async (book) => {
    try {
        const response = await axios.post(`${API_URL}/books`, book);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre', error);
    }
};

// Fonction pour mettre à jour un livre
export const updateBook = async (id, book) => {
    try {
        const response = await axios.put(`${API_URL}/books/${id}`, book);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du livre', error);
    }
};

// Fonction pour supprimer un livre
export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du livre', error);
    }
};

// Fonction pour télécharger un fichier
export const downloadFile = async (filename) => {
    try {
        const response = await axios.get(`${API_URL}/download/${filename}`, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier', error);
    }
};

// Fonction pour uploader un fichier
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'upload du fichier', error);
    }
};
