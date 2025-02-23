//src/api.jsx
import axios from "axios";
const API_URL = 'http://localhost:8000';
export const fetchLivres = async ()=>{
    try{
        const response = await  axios.get(`${API_URL}/livres`);
        return response.data;
    }catch(error){
        console.error('Erreur lors de la récupération des livres ', error);
    }
};
//// Fonction pour ajouter un livres
export const addLivre = async (livre)=>{
    try{
        const response= await axios.post(`${API_URL}/livres`, livre);
        return response.data;
    }catch(error){
        console.error('Erreur lors de l\'ajout de livres', error);
    }
};
// Fonction pour mettre à jour un livre
export const upadteLivre = async (id,livre)=>{
    try{
        const response= await axios.post(`${API_URL}/livres/${id}`, livre);
        return response.data;
    }catch(error){
        console.error('Erreur lors de l\'ajout de livres', error);
    }
};
// Fonction pour supprimer un livre
export const deleteLivre = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/livres/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression un  livre', error);
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

