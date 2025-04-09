import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ 1. Kya user exist karta hai?
        const admin = await User.findOne({ email });

        if (!admin || admin.role !== "admin") {
            return res.status(401).json({ message: "Invalid credentials or not an admin" });
        }

        // ✅ 2. Password match karega?
        // const isMatch = await admin.matchPassword(password);

        // if (!isMatch) {
        //     return res.status(401).json({ message: "Invalid credentials" });
        // }

        // ✅ 3. JWT Token generate karo
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.json({
            message: "Admin logged in successfully",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};




export const getAdminSummary = async (req, res) => {
    try {
        const ordersCount = await Order.countDocuments();
        const usersCount = await User.countDocuments();
        const productsCount = await Product.countDocuments();
        const totalSales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.json({
            ordersCount,
            usersCount,
            productsCount,
            totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error });
    }
};

// ✅ GET /api/admin/recent-orders
export const getRecentOrders = async (req, res) => {
    try {
      const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name email");
  
      res.json(recentOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent orders" });
    }
  };
  


  // ✅ Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.role === "admin") {
            return res.status(404).json({ message: "User not found or admin can't be deleted" });
        }

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};
