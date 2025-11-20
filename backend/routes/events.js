const express = require('express');
const { createEvent, getMyEvents, approveEvent, getAllEvents } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/my', protect, getMyEvents);
router.put('/:id/approve', protect, admin, approveEvent);
router.get('/', protect, admin, getAllEvents);

module.exports = router;