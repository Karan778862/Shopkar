import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "@/api/api";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Redux se shipping address, cart items & user token lo
//     const state = useSelector((state) => state);

    const { shippingAddress } = useSelector((state) => state.checkout);
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user); // 🔥 Redux se Token lo
    const token = user?.token;

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    const handlePaymentConfirmation = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
    
        try {
            // ✅ Debugging ke liye check karo
            console.log("🛒 Cart Items Before Sending:", cartItems);
            console.log("🟢 Order Items Before Sending:", cartItems);
    
            // ✅ Order Data ko correctly format karo
            const formattedOrderData = {
                orderItems: cartItems.map(item => ({
                    product: item.product?._id || item.product,  // ✅ Handle both object & ID cases
                    quantity: item.quantity,
                    price: item.product?.price || item.price  // ✅ Handle both cases
                })),
                shippingAddress,
                paymentMethod,
                totalPrice: cartItems.reduce((acc, item) => acc + (item.product?.price || item.price) * item.quantity, 0),
            };
    
            console.log("📦 Sending Order Data:", formattedOrderData);
    
            // ✅ Headers me token bhejo
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
    
            // ✅ Backend API Call
            const { data } = await axios.post(`${API}/api/order/place`, formattedOrderData, config);
    
            console.log("✅ Order Placed Successfully:", data);
    
            // ✅ Navigate to Confirmation Page with Order ID
            navigate(`/user/order-confirmation/${data._id}`);
        } catch (error) {
            console.error("❌ Order Placement Error:", error);
            alert("Something went wrong! Please try again.");
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Choose Payment Method
                </h2>

                <div className="space-y-4">
                    <button
                        className={`w-full p-3 ${paymentMethod === "COD" ? "bg-blue-600" : "bg-blue-500"} text-white rounded-lg hover:bg-blue-600 transition duration-300`}
                        onClick={() => handlePaymentMethod("COD")}
                    >
                        Cash on Delivery
                    </button>
                    <button
                        className={`w-full p-3 ${paymentMethod === "Credit/Debit" ? "bg-green-600" : "bg-green-500"} text-white rounded-lg hover:bg-green-600 transition duration-300`}
                        onClick={() => handlePaymentMethod("Credit/Debit")}
                    >
                        Credit/Debit Card
                    </button>
                    <button
                        className={`w-full p-3 ${paymentMethod === "UPI" ? "bg-purple-600" : "bg-purple-500"} text-white rounded-lg hover:bg-purple-600 transition duration-300`}
                        onClick={() => handlePaymentMethod("UPI")}
                    >
                        UPI Payment
                    </button>
                </div>

                {paymentMethod && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Selected Method: {paymentMethod}
                        </h3>

                        {paymentMethod === "Credit/Debit" && (
                            <div>
                                <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                                <input type="text" placeholder="Expiry Date" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                                <input type="text" placeholder="CVV" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                            </div>
                        )}

                        {paymentMethod === "UPI" && (
                            <div>
                                <input type="text" placeholder="UPI ID" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                            </div>
                        )}

                        <button
                            onClick={handlePaymentConfirmation}
                            className="w-full p-3 bg-[#E69138] text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                            Confirm Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
