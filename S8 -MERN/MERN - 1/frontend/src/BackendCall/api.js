// src/api.js
import axios from 'axios';

// Set up the base URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/product`, productData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create product');
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/product/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};
