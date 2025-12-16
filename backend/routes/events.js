import express from "express";
import { createEvent, getMyEvents, approveEvent, getAllEvents } from "../controllers/eventController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post('/', auth, createEvent);
router.get('/my', auth, getMyEvents);
router.put('/:id/approve', auth, adminOnly, approveEvent);
router.get('/', auth, adminOnly, getAllEvents);

export default router;
