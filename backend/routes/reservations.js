import express from "express";
import { createReservation, getMyReservations, getAllReservations } from "../controllers/reservationController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createReservation);
router.get("/my", auth, getMyReservations);
router.get("/all", auth, adminOnly, getAllReservations);

export default router;
