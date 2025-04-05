// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

// Define car CRUD routes
router.post('/cars', authMiddleware, carController.createCar);
router.get('/cars', authMiddleware, carController.getCars);
router.get('/cars/:id', authMiddleware, carController.getCarById);
router.put('/cars/:id', authMiddleware, carController.updateCar);
router.delete('/cars/:id', authMiddleware, carController.deleteCar);

module.exports = router;
