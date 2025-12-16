import express from "express";
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get('/', getMenu);
router.post('/', auth, adminOnly, createMenuItem);
router.put('/:id', auth, adminOnly, updateMenuItem);
router.delete('/:id', auth, adminOnly, deleteMenuItem);

export default router;
