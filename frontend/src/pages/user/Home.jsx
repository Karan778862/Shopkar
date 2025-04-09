// src/pages/Home.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../../redux/productSlice";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("http://localhost:3001/api/product/"); // API Call
        console.log(res.data);

        dispatch(setProducts(res.data)); 
      } catch (error) {
        dispatch(setError("Failed to fetch products"));
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className=" mt-17 w-full h-full  bg-white mx-auto p-4">
        {/* <h2 className="text-2xl font-bold mb-4">Products</h2> bg-[#84886e] */}
        <div className=" p-4 mb-5">

        <Banner/>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* ✅ FIX: Ensure `products.products` is not undefined before accessing `.length` */}
          {products && products.products && products.products.length > 0 ? (
            products.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
}
