import axios from 'axios';

// Définir l'URL de base pour l'API
const BASE_URL = 'http://localhost:8000';

export const fetchBook = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
    }
};
// Fonction pour télécharger un fichier
export const downloadFile = async (filename) => {
    try {
        const response = await axios.get(`${BASE_URL}/download/${filename}`, { responseType: 'blob' });
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
        const response = await axios.post(`${BASE_URL}/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'upload du fichier', error);
    }
};

// Fonction pour récupérer tous les livres

export const getBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
        throw error;
    }
};

// Fonction pour ajouter un livre
export const addBook = async (book) => {
    try {
        const response = await axios.post(`${BASE_URL}/books`, book);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre :', error);
        throw error;
    }
};

// Fonction pour mettre à jour un livre
export const updateBook = async (id, book) => {
    try {
        const response = await axios.put(`${BASE_URL}/books/${id}`, book);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du livre :', error);
        throw error;
    }
};

// Fonction pour supprimer un livre
export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du livre :', error);
        throw error;
    }
};
