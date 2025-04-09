// src/components/ProductCard.jsx
import { addToCart } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";
import { useState } from "react";
import ShareButton from "./ShareButton";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
  
      const { user } = useSelector((state) => state.user);

      const truncateTitle = (title, wordLimit = 4) => {
        const words = title.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : title;
      };
      const truncatedecription = (title, wordLimit = 7) => {
        const words = title.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : title;
      };

  console.log(product)
      const handleAddToCart = () => {
          if (!user) {
              return navigate("/auth/login");  // ✅ Agar user login nahi hai to login page par bhejo
          }
  
          dispatch(addToCart({ productId: product._id, quantity: 1 }))
              .unwrap()
              .then(() => alert("Added to Cart!"))
              .catch((err) => alert(err));
      };


// shear code


  return (
    // <div className="border  p-4 rounded-lg shadow-md bg-gray-200">
    //   <Link to={`/product/${product._id}`}>
    //     <img src={product?.images?.[0]?.url} alt={product.title} className=" h-40 mx-auto" />
    //     <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    //   </Link>
    //   <p className="text-gray-700">₹{product.price}</p>
    //   <button onClick={handleAddToCart} className="mt-2 bg-[#E69138] text-white px-4 py-2 rounded w-full">
    //     Add to Cart
    //   </button>
    // </div>




    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full mx-auto">
    {/* Image & Badge */}
    <div className="relative">
      <a href={`/product/${product._id}`}>
        <img
          src={product?.images?.[0]?.url}
          alt="Frido Ultimate Wedge Plus Cushion"
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
        {/* Badge */}
       
      </a>
      <div className=" float-right p-1">

      <ShareButton className="" product={product} />
      </div>
    </div>

    {/* Details */}
    <div className="p-4">
      <a href={`/product/${product._id}`}>
        <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition">
        {truncateTitle(product.name)}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {truncatedecription(product.description
)}
        </p>
      </a>

      {/* Rating */}
      <div className="flex items-center space-x-2 text-sm mb-2">
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <p>{product.ratings}</p>
        <p className="text-gray-500">(969+ Reviews)</p>
      </div>

      {/* Price */}
      <div className="mb-4 flex justify-between">
        <p className="text-xl font-bold text-green-600">₹{product.price}</p>
        <p className="text-gray-500 line-through text-sm">₹4,799</p>
        <p className="text-sm text-red-500">59% Off</p>
      </div>

      {/* Button */}
      <button onClick={handleAddToCart} className="w-full bg-[#E69138] text-white py-2 rounded-lg hover:bg-[#e69238c0] transition">
        ADD TO CART
      </button>
      
    </div>
  </div>
  );
}






