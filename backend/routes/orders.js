const express = require('express');
const { createOrder, getMyOrders, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.put('/:id', protect, admin, updateOrderStatus);
router.get('/', protect, admin, getAllOrders);

module.exports = router;