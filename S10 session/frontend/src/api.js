import axios from 'axios';
const API_URL = 'http://localhost:5000'; // Update with your backend URL

export const api = axios.create({
    baseURL: 'http://localhost:5000', // Ton backend API
    withCredentials: true, // Important for session handling

    headers: {
        'Content-Type': 'application/json',
    },
});



// Axios instance with session-based authentication
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is crucial for session-based authentication
});

// Get all cars
export const getCars = async () => {
  const response = await axiosInstance.get('/cars');
  return response.data;
};

// Create a new car
export const createCar = async (carData) => {
  const response = await axiosInstance.post('/cars', carData);
  return response.data;
};

// Update a car
export const updateCar = async (id, carData) => {
  const response = await axiosInstance.put(`/cars/${id}`, carData);
  return response.data;
};

// Delete a car
export const deleteCar = async (id) => {
  const response = await axiosInstance.delete(`/cars/${id}`);
  return response.data;
};