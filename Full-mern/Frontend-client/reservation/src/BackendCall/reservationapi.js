import axios from 'axios';

// Set up the base URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all reservations
export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reservations');
  }
};

// Create a new reservation
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, reservationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create reservation');
  }
};

// Update an existing reservation
export const updateReservation = async (id, reservationData) => {
  try {
    const response = await axios.put(`${API_URL}/reservations/${id}`, reservationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update reservation');
  }
};

// Delete a reservation
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete reservation');
  }
};
