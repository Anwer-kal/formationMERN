import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../api';

const initialState = {
  isAuthenticated: null, // Start with null to indicate loading
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
    },
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.status = 'succeeded';
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.status = 'failed';
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    verifyTokenStart(state) {
      state.status = 'loading';
    },
    verifyTokenSuccess(state) {
      state.isAuthenticated = true;
      state.status = 'succeeded';
    },
    verifyTokenFailure(state) {
      state.isAuthenticated = false;
      state.status = 'failed';
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  verifyTokenStart,
  verifyTokenSuccess,
  verifyTokenFailure
} = authSlice.actions;

export default authSlice.reducer;

// Thunk for verifying token
export const verifyToken = () => async (dispatch) => {
  dispatch(verifyTokenStart());
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(verifyTokenFailure());
    return;
  }

  try {
    const response = await axios.get('http://localhost:5000/auth/verify-token', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.authenticated) {
      dispatch(verifyTokenSuccess());
    } else {
      dispatch(verifyTokenFailure());
    }
  } catch (error) {
    console.error('Error verifying token', error);
    dispatch(verifyTokenFailure());
  }
};

// Thunk for login
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};