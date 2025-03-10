import axios from 'axios';

// Set up the base URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all clients
export const fetchClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch clients');
  }
};

// Create a new client
export const createClient = async (clientData) => {
  try {
    const response = await axios.post(`${API_URL}/client`, clientData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create client');
  }
};

// Update an existing client
export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${API_URL}/client/${id}`, clientData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update client');
  }
};

// Delete a client
export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/client/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete client');
  }
};
