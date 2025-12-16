import express from "express";
import { createReservation, getMyReservations, updateReservationStatus, getAllReservations } from "../controllers/reservationController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/my', protect, getMyReservations);
router.put('/:id', protect, admin, updateReservationStatus);
router.get('/', protect, admin, getAllReservations);

export default router;