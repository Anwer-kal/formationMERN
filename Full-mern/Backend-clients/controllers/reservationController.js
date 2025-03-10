const Reservation = require('../models/reservation');

// Créer une réservation
exports.createReservation = async (req, res) => {
  const { startDate, endDate ,clientName,status } = req.body;

  try {
    // Créer une nouvelle réservation
    const newReservation = new Reservation({
      clientName,
      startDate,
      endDate,
      status,
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ message: 'Error creating reservation', error: err });
  }
};

// Récupérer toutes les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservations', error: err });
  }
};

// Récupérer une réservation par ID
exports.getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservation', error: err });
  }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, status } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { endDate, startDate, status },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(500).json({ message: 'Error updating reservation', error: err });
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting reservation', error: err });
  }
};
