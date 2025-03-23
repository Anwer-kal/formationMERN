import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CarsProvider } from './context/CarsContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <CarsProvider>{element}
  </CarsProvider> : <Navigate to="/login" />;
};

export default ProtectedRoute;