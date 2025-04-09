import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/adminOrderSlice";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
console.log(orders)
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const isInRange =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));

    return matchesSearch && isInRange;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 All Orders</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or User Name"
          className="border px-3 py-1 rounded w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          <label className="mr-2 font-medium">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="mr-2 font-medium">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Orders Table */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && filteredOrders.length === 0 && <p>No orders found.</p>}

      {!loading && filteredOrders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Payment</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border">
                    {order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-2 px-4 border">
                    {order.user?.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border">
                    ₹{order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                  </td>
                  <td className="py-2 px-4 border">
                    {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
                  </td>
                  <td className="py-2 px-4 border capitalize">{order.status}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border flex gap-2 items-center">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-500 underline text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">
              Order Details: #{selectedOrder._id.slice(-6).toUpperCase()}
            </h3>
            <p><strong>User:</strong> {selectedOrder.user?.name}</p>
            <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
            <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Payment:</strong> {selectedOrder.isPaid ? "Paid" : "Not Paid"}</p>

            {/* Address */}
            {selectedOrder.shippingAddress && (
              <div className="mt-4">
                <p className="font-medium">📍 Shipping Address:</p>
                <p>{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}</p>
                <p>{selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pinCode}</p>
                <p>Phone: {selectedOrder.user?.phone}</p>
              </div>
            )}

            <p className="mt-4 font-medium">🛍️ Items:</p>
            <ul className="list-disc list-inside">
              {selectedOrder.orderItems?.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;