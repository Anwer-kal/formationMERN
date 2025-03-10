const express = require('express');
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');

const router = express.Router();

// Routes cohérentes
router.post('/reservations', createReservation);
router.get('/reservations', getAllReservations);
router.get('/reservations/:id', getReservationById);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

module.exports = router;
