import express from "express";
import { registerUser, loginUser, getMe, updateMe, getUsers } from "../controllers/userController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);
router.get('/', auth, adminOnly, getUsers);

export default router;
