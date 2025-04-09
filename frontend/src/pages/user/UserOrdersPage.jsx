import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders()); // ✅ Fetch user orders on page load
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className=" mt-14 max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your Orders</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  🆔 Order ID: {order._id}
                </h3>
                <p>
                  Status: <span className="font-bold">{order.status}</span>
                </p>
                <p>Total: ₹{order.totalPrice}</p>
                <p>Payment: {order.paymentMethod}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

                {/* ✅ Order Items List with Image */}
                <div className="mt-4">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center border-b pb-3 mb-3"
                    >
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-gray-600">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ✅ View Order Details */}
                <Link
                  to={`/user/order-confirmation/${order._id}`}
                  className=" text-white "
                >
                  <span className="bg-[#84886e] px-2 py-2 rounded-md text font-semibold">
                    {" "}
                    View Details
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrdersPage;
