import express from "express"
import { cancelOrder, getAllOrders, getOrderById, getUserOrders, markOrderAsDelivered, placeOrder, updateOrderStatus } from "../controllers/orderCntroller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/place").post(protect, placeOrder);
router.route("/").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, markOrderAsDelivered);
router.route("/admin/:id/update").put(protect, updateOrderStatus);
router.route("/:id/cancel").put( protect, cancelOrder);
router.route("/admin/all").get( protect,getAllOrders );


export default router;