import express from "express";
import { createOrder, getMyOrders, updateOrderStatus, getAllOrders } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();
router.post('/',createOrder)
router.get('/my', protect, getMyOrders);
router.put('/:id', protect, admin, updateOrderStatus);
router.get('/', protect, admin, getAllOrders);

export default router;