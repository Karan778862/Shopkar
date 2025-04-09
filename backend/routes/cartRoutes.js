import express from "express"
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.route("/add").post(protect,addToCart);
router.route("/get").get(protect,getCart);
router.route("/remove").post(protect,removeFromCart);


export default router;