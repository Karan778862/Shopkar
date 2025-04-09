import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true }, // Phone number added
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });


export default mongoose.model("User",userSchema);