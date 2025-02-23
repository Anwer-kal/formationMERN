//// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Fonction pour récupérer les utilisateurs
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
    }
};

// Fonction pour ajouter un utilisateur
export const addUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
    }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
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
