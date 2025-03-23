import React from 'react';
import { AuthProvider } from './AuthContext';
import { CarsProvider } from './CarsContext';

// Combine both providers into a single provider component
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CarsProvider>{children}</CarsProvider>
    </AuthProvider>
  );
};

// Export the contexts for easy access
export { default as AuthContext } from './AuthContext';
export { default as CarsContext } from './CarsContext';