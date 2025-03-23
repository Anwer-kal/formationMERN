import React, { createContext, useState } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '../api';

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const carsData = await getCars();
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const addCar = async (carData) => {
    try {
      const newCar = await createCar(carData);
      fetchCars()
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const updateCarById = async (id, carData) => {
    try {
      await updateCar(id, carData);
      setCars(cars.map(car => (car._id === id ? { ...car, ...carData } : car)));
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const deleteCarById = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <CarsContext.Provider value={{ cars, fetchCars, addCar, updateCarById, deleteCarById }}>
      {children}
    </CarsContext.Provider>
  );
};

export default CarsContext;