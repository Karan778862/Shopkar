import { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [summaryRes, recentOrdersRes] = await Promise.all([
          axios.get("http://localhost:3001/api/admin/summary", { headers }),
          axios.get("http://localhost:3001/api/admin/recent-orders", { headers }),
        ]);

        setSummary(summaryRes.data);
        setRecentOrders(recentOrdersRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Orders" value={summary.ordersCount} color="bg-blue-100" />
        <Card title="Total Users" value={summary.usersCount} color="bg-green-100" />
        <Card title="Total Products" value={summary.productsCount} color="bg-yellow-100" />
        <Card title="Total Sales" value={`₹${summary.totalSales}`} color="bg-pink-100" />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">User</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id} className="border-b text-sm">
                <td className="py-2">{order._id.slice(0, 8)}...</td>
                <td className="py-2">{order.user?.name}</td>
                <td className="py-2 font-medium">₹{order.totalPrice}</td>
                <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-6 rounded-xl shadow-md ${color}`}>
    <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

export default DashboardHome;
