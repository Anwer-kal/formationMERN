import React, { useContext } from 'react';
import CarsContext from '../context/CarsContext';

const CarNumber = () => {
  const { cars } = useContext(CarsContext); // Access cars directly from the context
  console.log(cars)
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>Number of cars: {cars.length}</p> {/* Display the number of cars dynamically */}
    </div>
  );
};

export default CarNumber;