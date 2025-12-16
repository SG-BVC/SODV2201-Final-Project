import express from "express";
import { createOrder, getMyOrders, updateOrderStatus, getAllOrders } from "../controllers/orderController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post('/', createOrder);
router.get('/my', auth, getMyOrders);
router.put('/:id', auth, adminOnly, updateOrderStatus);
router.get('/', auth, adminOnly, getAllOrders);

export default router;
