import React from 'react';
import { useSelector } from 'react-redux';

const PrivacyPage = () => {
  const { cars } = useSelector((state) => state.cars); // Access cars from Redux store

  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>Private Number of cars: {cars.length}</p>
    </div>
  );
};

export default PrivacyPage;