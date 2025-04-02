import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { confirmOrder, createOrder } from "../controllers/orderController.js";
import { getUserOrders } from "../controllers/orderController.js";
const router = express.Router();

router.route('/')
.post(protect, createOrder)
.get(protect, getUserOrders);

router.route('/confirmOrder').post(protect, confirmOrder)

export default router; 


            
