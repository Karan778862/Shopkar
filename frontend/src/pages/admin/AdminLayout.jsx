// src/components/admin/AdminLayout.jsx
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-center">🛠 Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin/" className="block text-gray-700 hover:text-blue-600">📊 Dashboard</Link>
          <Link to="/admin/users" className="block text-gray-700 hover:text-blue-600">👥 Manage Users</Link>
          <Link to="/admin/products" className="block text-gray-700 hover:text-blue-600">📦 Manage Products</Link>
          <Link to="/admin/orders" className="block text-gray-700 hover:text-blue-600">🧾 Manage Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
