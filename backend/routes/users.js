import express from "express";
import { registerUser, loginUser, getMe, updateMe, getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.get('/', protect, admin, getUsers);

export default router;