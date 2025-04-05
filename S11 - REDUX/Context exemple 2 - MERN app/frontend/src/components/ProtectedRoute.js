import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../features/cars/carsSlice';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCars());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? element : <Navigate to="/login" />;
};