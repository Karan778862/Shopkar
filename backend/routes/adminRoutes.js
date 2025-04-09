import express from "express"

import { adminLogin, deleteUser, getAdminSummary, getAllUsers, getRecentOrders } from "../controllers/adminController.js";

const router = express.Router();

router.route("/login").post(adminLogin)
router.route("/summary").get(getAdminSummary)
router.route("/recent-orders").get(getRecentOrders)
router.route("/users").get(getAllUsers)
router.route("/user/delete/:id").delete(deleteUser)

export default router;