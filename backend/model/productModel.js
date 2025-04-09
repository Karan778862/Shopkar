import mongoose from "mongoose"


// create product
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        stock: { type: Number, required: true, min: 0, default: 0 },
        images: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
        ratings: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        reviews: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, name: { type: String, required: true }, rating: { type: Number, required: true }, comment: { type: String, required: true } }],
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);



