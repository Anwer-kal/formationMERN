// controllers/carController.js
const Car = require('../models/Car');
const jwt = require('jsonwebtoken');

// Create a new car
exports.createCar = async (req, res) => {
    const { make, model, year, price, image } = req.body;
    try {
      console.log()
      const newCar = new Car({  make, model, year, price, image});
      await newCar.save();
      res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all cars
exports.getCars = async (req, res) => {
  try {
    console.log('-----------------', req.session)

    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a car by ID
exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const {  make, model, year, price, image } = req.body;
    try {
      const updatedCar = await Car.findByIdAndUpdate(id, {  make, model, year, price, image }, { new: true });
      if (!updatedCar) return res.status(404).json({ error: 'Car not found' });
      res.json(updatedCar)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    await car.remove();
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

