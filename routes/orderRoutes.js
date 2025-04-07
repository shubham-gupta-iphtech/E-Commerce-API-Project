import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { confirmOrder, createOrder } from "../controllers/orderController.js";
import { getUserOrders ,deleteOrder} from "../controllers/orderController.js";
import { deleteModel } from "mongoose";
const router = express.Router();

router.route('/')
.post(protect, createOrder)
.get(protect, getUserOrders);
// .delete(protect, deleteUserOrders)

router.route('/confirmOrder').post(protect, confirmOrder);
router.route('/canceluserorder/:id').delete(protect,deleteOrder);
export default router; 


            
