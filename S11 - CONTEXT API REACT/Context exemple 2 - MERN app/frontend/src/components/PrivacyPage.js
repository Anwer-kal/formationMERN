import React, { useContext } from 'react';
import CarsContext from '../context/CarsContext';

const PrivacyPage = () => {
  const { cars } = useContext(CarsContext); // Access cars directly from the context
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>This is the privacy policy page. It is accessible only to authenticated users.</p>
      <p>Number of cars: {cars.length}</p> {/* Display the number of cars dynamically */}
    </div>
  );
};

export default PrivacyPage;