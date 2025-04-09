import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../model/userModel.js";  // Tumhare user model ka path sahi rakho
import bcrypt from "bcryptjs";

dotenv.config();

try {
    await mongoose.connect("mongodb+srv://kkpkaran22:dqkR4V013HfyfRpA@cluster0.805sm.mongodb.net/")
    console.log("momgodb connect")
} catch (error) {
    console.log(error)
}

const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: "admin@example.com" });

        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("adminpassword", 10);

        const admin = new User({
            name: "Admin User",
            email: "admin@example.com",
            phone:"989970870",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("Admin Created Successfully!");
        process.exit();
    } catch (error) {
        console.error("Error Creating Admin:", error);
        process.exit(1);
    }
};

createAdmin();
