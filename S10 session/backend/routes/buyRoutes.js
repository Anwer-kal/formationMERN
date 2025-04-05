// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buyController'); // Import the new controller
const authMiddleware = require('../middleware/authMiddleware');


// Define buy car route
router.post('/cars/buy', authMiddleware, buyController.buyCar);

module.exports = router;