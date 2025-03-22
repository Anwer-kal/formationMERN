import axios from 'axios';
const API_URL = 'http://localhost:5000'; // Update with your backend URL

export const api = axios.create({
    baseURL: 'http://localhost:5000', // Ton backend API
    headers: {
        'Content-Type': 'application/json',
    },
});



// Get token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  };
  
  // Get all cars
  export const getCars = async () => {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/cars`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  };
  
  // Create a new car
  export const createCar = async (carData) => {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/cars`, carData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  };
  
  // Update a car
  export const updateCar = async (id, carData) => {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/cars/${id}`, carData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  };
  
  // Delete a car
  export const deleteCar = async (id) => {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/cars/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  };