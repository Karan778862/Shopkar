import express from "express";
import dotenv from "dotenv";
import mongodb from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅ IMPORT Karo

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";



dotenv.config();

const app = express();

const _dirname =path.resolve();


const corsOption = {
    origin: " http://localhost:5173",
    credentials: true // ✅ Spelling "credentials" sahi karo (C capital mat rakho)
};

app.use(cors(corsOption));
app.use(cookieParser()); // ✅ Yeh Line Important Hai (Cookies Parse Karne Ke Liye)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*",(req, res)=>{
    res.sendFile(path.resolve(_dirname,"frontend", "dist","index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    mongodb();
    console.log(`Server running on port no: ${PORT}`);
});