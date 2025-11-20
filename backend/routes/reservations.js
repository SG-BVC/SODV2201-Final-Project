const express = require('express');
const { createReservation, getMyReservations, updateReservationStatus, getAllReservations } = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/my', protect, getMyReservations);
router.put('/:id', protect, admin, updateReservationStatus);
router.get('/', protect, admin, getAllReservations);

module.exports = router;