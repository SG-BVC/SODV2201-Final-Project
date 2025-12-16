import express from "express";
import { createEvent, getMyEvents, approveEvent, getAllEvents } from "../controllers/eventController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/my', protect, getMyEvents);
router.put('/:id/approve', protect, admin, approveEvent);
router.get('/', protect, admin, getAllEvents);

export default router;