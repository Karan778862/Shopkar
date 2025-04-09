import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            }
        ],
        shippingAddress: {
            address: String,
            city: String,
            pincode: String,
            country: String,
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Razorpay", "Stripe"],
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
        deliveredAt: Date,

        // Cancel & Refund Fields 
        isCancelled: { type: Boolean, default: false }, // Order Cancelled or Not
        cancelledAt: { type: Date }, // Order Cancel Date

    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);