import express from "express";
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.get('/', getMenu);
router.post('/', protect, admin, createMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

export default router;