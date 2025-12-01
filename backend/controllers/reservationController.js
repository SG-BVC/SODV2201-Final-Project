const Reservation = require('../models/Reservation');


exports.createReservation = async (req, res) => {
  const { date, time, guests, eventType, specialNotes } = req.body;
  try {
    
    const existing = await Reservation.findOne({
      date,
      time,
      status: { $ne: 'cancelled' }
    });
    if (existing) return res.status(400).json({ msg: 'Time slot already booked' });

    const reservation = await Reservation.create({
      user: req.user.id,
      date,
      time,
      guests,
      eventType,
      specialNotes
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getMyReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user.id });
  res.json(reservations);
};


exports.updateReservationStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reservation) return res.status(404).json({ msg: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getAllReservations = async (req, res) => {
  const reservations = await Reservation.find().populate('user', 'name email');
  res.json(reservations);
};