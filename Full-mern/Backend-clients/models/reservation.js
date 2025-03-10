const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Le nom du client est obligatoire'],
    },
    startDate: {
      type: Date,
      required: [true, 'La date de réservation est obligatoire'],
    },
    endDate: {
      type: Date,
      required: [true, 'La date de réservation est obligatoire'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
