const express = require('express');
const { registerUser, loginUser, getMe, updateMe, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.get('/', protect, admin, getUsers);

module.exports = router;