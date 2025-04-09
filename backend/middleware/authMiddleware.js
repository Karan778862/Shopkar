import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protect = async (req, res, next) => {
    try {
        console.log("🔹 Headers received:", req.headers);
        let token = req.headers.authorization; 
        console.log("🔹 Raw Token Header:", token);

        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // ✅ Remove "Bearer "
        } else {
            return res.status(401).json({ message: "Not authorized, no token!" });
        }

        console.log("🔹 Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🟢 Decoded JWT:", decoded); // Debugging

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found, not authorized!" });
        }

        console.log("🟢 User Found:", req.user);
        next();
    } catch (error) {
        console.error("🔴 Token Verification Failed:", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export default protect;
