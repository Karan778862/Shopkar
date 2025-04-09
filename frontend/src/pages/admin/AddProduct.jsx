import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: [""], // Multiple image URLs as string for now
  });

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    if (e.target.name === "images") {
      const updatedImages = [...formData.images];
      updatedImages[index] = e.target.value;
      setFormData({ ...formData, images: updatedImages });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 👇 Convert images from [string] to [{ public_id, url }]
    const formattedImages = formData.images.map((url, i) => ({
      public_id: `dummy-id-${i + 1}`,
      url: url.trim()
    }));
  
    const finalFormData = {
      ...formData,
      images: formattedImages
    };
  
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await axios.post(
        "http://localhost:3001/api/product/create",
        finalFormData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert(data.message);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding product.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange}
          className="w-full border p-2 rounded" required />

        <div>
          <label className="block font-semibold mb-1">Images (URLs):</label>
          {formData.images.map((img, index) => (
            <input
              key={index}
              type="text"
              name="images"
              placeholder={`Image URL ${index + 1}`}
              value={img}
              onChange={(e) => handleChange(e, index)}
              className="w-full border p-2 rounded mb-2"
              required
            />
          ))}
          <button type="button" onClick={addImageField} className="text-blue-600 mt-1">
            ➕ Add another image
          </button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
