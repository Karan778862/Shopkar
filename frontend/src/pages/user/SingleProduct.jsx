// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchSingleProduct, clearSingleProduct } from "../../redux/singleProductSlice";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Loader } from "lucide-react";
// import Navbar from "@/components/Navbar";

// export default function SingleProduct() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const { product, loading, error } = useSelector((state) => state.singleProduct);

//   useEffect(() => {
//     dispatch(fetchSingleProduct(id));
//     return () => dispatch(clearSingleProduct());
//   }, [dispatch, id]);

//   const checkoutHandle = ()=>{
//     navigate("/user/shipping")
//   }

//   if (loading) {
//     return <div className="  flex justify-center items-center h-screen"><Loader className="animate-spin" size={48} /></div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center mt-10">{error}</div>;
//   }

//   return (
//    <>
//    <Navbar/>
//     <div className=" mt-10 mx-auto p-4">
//       {product.product ? (
//         <Card className="flex flex-col md:flex-row gap-6 p-6 shadow-lg rounded-xl bg-white">
//           {/* Left - Product Image */}
//           <div className="w-full md:w-1/2 flex justify-center">
//             <img src={product.product.images[0].url} alt={product.product.name} className="max-h-96 object-contain" />
//           </div>
          
//           {/* Right - Product Details */}
//           <CardContent className="w-full md:w-1/2 flex flex-col gap-4">
//             <h1 className="text-2xl font-bold">{product.product.name}</h1>
//             <p className="text-gray-600">{product.product.description}</p>
//             <span className="text-xl font-semibold text-green-600">₹{product.product.price}</span>
//             <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
//             <Button onClick={checkoutHandle} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">buy</Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <p className="text-center text-gray-500">Product not found.</p>
//       )}
//     </div>
//    </>
//   );
// }









import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct, clearSingleProduct } from "../../redux/singleProductSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.singleProduct);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    return () => dispatch(clearSingleProduct());
  }, [dispatch, id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" size={48} /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!product.product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  const images = product.product.images || [];
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <Navbar />
      <div className="mt-10 mx-auto p-4 max-w-5xl">
        <Card className="flex flex-col md:flex-row gap-6 p-6 shadow-lg rounded-xl bg-white">
          {/* Left - Image Carousel */}
          <div className="w-full md:w-1/2 relative">
            {images.length > 0 && (
              <>
                <img src={images[currentImage].url} alt={product.product.name} className="w-full h-96 object-contain rounded-lg" />
                <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Right - Product Details */}
          <CardContent className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">🔥 Hot Selling</span>
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <Star size={16} fill="currentColor" /> 4.8 (1249 Reviews)
              </span>
            </div>
            <h1 className="text-2xl font-bold">{product.product.name}</h1>
            <p className="text-gray-600">{product.product.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-green-600">₹{product.product.price}</span>
              <span className="text-gray-500 line-through">₹{product.product.mrp}</span>
              <span className="bg-yellow-400 text-black text-sm px-2 py-1 rounded">{product.product.discount}% OFF</span>
            </div>
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
            <Button onClick={() => navigate("/user/shipping")} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Buy Now</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
