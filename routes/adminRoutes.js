import express from "express";
import { getAllOrders, getOrderAnalytics, getProductAnalytics } from "../controllers/adminController.js";
import {protect, admin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get('/orders/analytics', protect, admin , getOrderAnalytics);
router.get('/orders', protect, admin , getAllOrders);
router.get('/products/analytics', protect, admin, getProductAnalytics);

export default router;

