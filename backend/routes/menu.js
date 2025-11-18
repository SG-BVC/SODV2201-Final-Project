const express = require('express');
const { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMenu);
router.post('/', protect, admin, createMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;