import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import jwt from "jsonwebtoken"
//register
export const registerUser = async (req, res) => {
    
    try {
        const { name, email, phone, password, role } = req.body;
        console.log(name, email, phone, password, role)

        if(!name || !email || !phone || !password){
            res.status(203).json({
                message:"all fild requried",
                success:false
            })
        }

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) return res.status(400).json({ message: "Email or phone already exists" });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
             role: role || "user",
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role:user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email/phone or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email/phone or password" });
        }

        const token = generateToken(user._id);
        console.log("🟢 Generated Token:", token); // Debugging
        // ✅ Token ko Cookie me Set Karo
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Din
        });

        // ✅ Response Send Karo (Sirf Ek Baar!)
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: token,
            message: "Login successful!",
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


//logout
 export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {  
            httpOnly: true,
            expires: new Date(0)  // Cookie expire karke logout
        });
        res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};



// export const deleteUser = async (req, res) => {
//     try {
//       const userId = req.params.id;
  
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       await User.findByIdAndDelete(userId);
  
//       res.status(200).json({ message: "User deleted successfully" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Something went wrong while deleting user" });
//     }
//   };
  


