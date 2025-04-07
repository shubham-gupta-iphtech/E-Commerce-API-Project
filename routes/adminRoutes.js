import express from "express";
import { confirmandshiporder, getAllOrders, getOrderAnalytics, getProductAnalytics, setOrderDelivered } from "../controllers/adminController.js";
import {protect, admin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get('/orders/analytics', protect, admin , getOrderAnalytics);
router.get('/orders', protect, admin , getAllOrders);
router.get('/products/analytics', protect, admin, getProductAnalytics);

router.post('/orders/confirmandshiporder/:id', protect, confirmandshiporder );
router.post('/orders/setorderdelivered/:id', protect, setOrderDelivered);

export default router;

