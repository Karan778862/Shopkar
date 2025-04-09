import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/api/api";

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null;

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUserHandler = async (id) => {
       
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API}/api/admin/user/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(users.filter(user => user._id !== id));
            } catch (err) {
                console.error("Failed to delete user:", err);
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">All Users</h2>
            <table className="w-full text-left border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">
                                {console.log(user._id)}
                                <button
                                    onClick={() => deleteUserHandler(user._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserPage;
