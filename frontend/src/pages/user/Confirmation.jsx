import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "@/api/api";

const OrderConfirmation = () => {
    const { id } = useParams()
    console.log(id); // ✅ URL se orderId le rahe hain
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null;
                if (!token) {
                    setError("User not authenticated!");
                    setLoading(false);
                    return;
                }

                const res = await axios.get(`${API}/api/order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                    console.log(res)
                setOrder(res.data.order);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Something went wrong!");
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold text-gray-700 text-center">Order Confirmation</h2>
            <p className="text-gray-500 text-center">Order ID: <span className="font-semibold">{order._id}</span></p>

            {/* Order Items */}
            {/* <div className="mt-6 border-t pt-4">
                {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
                        <div>
                            <p className="text-lg font-semibold">{item.product.name}</p>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-lg font-bold">₹{item.price}</p>
                    </div>
                ))}
            </div> */}
            <div className="mt-6 border-t pt-4">
  {order.orderItems.map((item, index) => (
    <div key={index} className="flex items-center gap-4 py-4 border-b">
      {/* Product Image */}
      <img
        src={item?.product?.images[0]?.url}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg border"
      />

      {/* Product Details */}
      <div className="flex-1">
        <p className="text-lg font-semibold">{item.product.name}</p>
        <p className="text-gray-500">Quantity: {item.quantity}</p>
      </div>

      {/* Price */}
      <p className="text-lg font-bold text-right min-w-[80px]">₹{item.price}</p>
    </div>
  ))}
</div>

            {/* Shipping Address */}
            <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Shipping Address</h3>
                <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </div>

            {/* Payment & Total */}
            <div className="mt-6 border-t pt-4">
                <p className="text-lg font-semibold">Payment Method: <span className="text-blue-600">{order.paymentMethod}</span></p>
                <p className="text-xl font-bold mt-2">Total: ₹{order.totalPrice}</p>
            </div>

            {/* Back Button */}
            <button onClick={() => navigate("/")} className="mt-6 w-full bg-[#E69138] text-white py-2 rounded-lg hover:bg-[#b9bd9d] transition">Back to Home</button>
        </div>
    );
};

export default OrderConfirmation;
