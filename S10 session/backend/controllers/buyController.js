// controllers/buyController.js
const Car = require('../models/Car');
const BuyCar = require('../models/BuyCar');

// Buy a car
exports.buyCar = async (req, res) => {
  const { carId, name, email } = req.body;

  try {
    // Check if the car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    if (!car.available) {
      return res.status(400).json({ error: 'Car is not available' });
    }

    // Update the car's availability
    car.available = false;
    await car.save();

    // Create a new BuyCar record
    const newPurchase = new BuyCar({ carId, name, email });
    await newPurchase.save();

    res.status(201).json({ message: 'Car purchased successfully', purchase: newPurchase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};