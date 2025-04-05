import React from 'react';
import { useSelector } from 'react-redux';

const CarNumber = () => {
  // Access cars from Redux store instead of Context
  const { cars } = useSelector((state) => state.cars);
  
  console.log('Cars from Redux:', cars); // Updated console log

  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>Number of cars: {cars.length}</p>
    </div>
  );
};

export default CarNumber;