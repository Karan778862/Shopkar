import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "@/api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    const { data } = await axios.get(`${API}/api/product/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(data.products); // ✅ Yeh fix hai
  };

  const handleDelete = async (productId) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const response = await axios.delete(`${API}/api/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(response.data.message); // "Product deleted successfully!"

    // ✅ UI se bhi hata do
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Something went wrong!");
  }
};

const truncatedecription = (title, wordLimit = 7) => {
    const words = title.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : title;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">All Products</h2>
        <Link to="/admin/products/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add Product
        </Link>
      </div>

      <table className="w-full text-left border">
  <thead>
    <tr className="bg-gray-100">
      <th className="p-2">Image</th>
      <th className="p-2">Name</th>
      <th className="p-2">Price</th>
      <th className="p-2">Stock</th>
      <th className="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.length === 0 ? (
      <tr>
        <td colSpan="5" className="text-center py-4 text-gray-500">
          Product not found
        </td>
      </tr>
    ) : (
      products.map((prod) => (
        <tr key={prod._id} className="border-t  bg-white gap-4 ">
          <td className="p-2">
            <img src={prod.images[0].url} alt={prod.name} className="w-16 h-16 object-cover rounded" />
          </td>
          <td className="p-2">{truncatedecription(prod.name)}</td>
          <td className="p-2">₹{prod.price}</td>
          <td className="p-2">{prod.stock}</td>
          <td className="p-2 space-x-2">
            <Link to={`/admin/products/edit/${prod._id}`} className="text-blue-500">Edit</Link>
            <button onClick={() => handleDelete(prod._id)} className="text-red-500">Delete</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
    </div>
  );
};

export default ProductList;
