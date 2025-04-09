import express from "express";
import { createProduct, deleteProduct, getAllProducts, searchProducts, sinngleProduct, updateProduct } from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";



const router = express.Router();

router.route("/create").post(protect,createProduct);
router.route("/").get(getAllProducts);
router.route("/single/:id").get(sinngleProduct);
router.route("/update/:id").patch(protect, updateProduct);
router.route("/delete/:id").post(protect, deleteProduct);
router.route("/search").get(searchProducts);


export default router;