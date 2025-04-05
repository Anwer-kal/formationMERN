import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import carsReducer from './carsSlice';
const store = configureStore({
    reducer: {
      auth: authReducer,
      cars: carsReducer
    }
  });
  
  export default store;