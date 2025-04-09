import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "@/api/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: [""],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`${API}/api/product/single/${id}`);
      setFormData(data.product);
    };

    fetchProduct();
  }, [id]);

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
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      const { data } = await axios.put(`${API}/api/product/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(data.message);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating product.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields like name, price, etc. */}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border" />
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full p-2 border" />
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border" />

        {formData.images.map((image, index) => (
  <input
    key={index}
    type="text"
    name="images"
    value={typeof image === "string" ? image : image.url}
    onChange={(e) => handleChange(e, index)}
    placeholder={`Image URL ${index + 1}`}
    className="w-full p-2 border"
  />
))}
        <button type="button" onClick={addImageField} className="px-4 py-2 bg-blue-500 text-white rounded">
          + Add More Images
        </button>

        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
