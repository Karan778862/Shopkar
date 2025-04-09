import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleRemoveFromCart = (productId, event) => {
    event.preventDefault();
    dispatch(removeFromCart(productId));
    window.location.reload();
  };

  const truncateTitle = (title, wordLimit = 4) => {
    if (!title || typeof title !== "string") return "No Title";
    const words = title.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : title;
  };

  const checkoutHandle = () => {
    navigate("/user/shipping");
  };

  const handleQuantityChange = (productId, quantity) => {
    // implement quantity update logic here
  };

  const totalPrice = cart?.reduce((acc, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 1;
    return acc + quantity * price;
  }, 0);

  return (
    <>
      <Navbar />
      <div className="bg-white mt-17 min-h-screen w-full max-w-6xl mx-auto p-4">
        {cart?.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-500">
              Go back to shopping.
            </Link>
          </p>
        ) : (
          <div className="shadow p-4 bg-gray-100 rounded-md">
            {cart.map((item) => (
              <div
                key={item?.product?._id}
                className="flex bg-white rounded-md shadow items-center justify-between mb-4 p-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item?.product?.images?.[0]?.url || "/placeholder.png"}
                    alt={item?.product?.name || "Product"}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {truncateTitle(item?.product?.name)}
                    </h3>
                    <p className="text-gray-600">Price: ₹{item?.product?.price || 0}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item?.product?._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded-md text-sm"
                  >
                    -
                  </button>
                  <span className="mx-2">{item?.quantity || 1}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item?.product?._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-md text-sm"
                  >
                    +
                  </button>
                </div>

                <div className="flex ml-4 md:items-center">
                  <button
                    type="button"
                    onClick={(event) => handleRemoveFromCart(item?.product?._id, event)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 text-right">
              <h3 className="text-xl font-semibold">Total Price: ₹{totalPrice}</h3>
              <button
                onClick={checkoutHandle}
                className="px-6 py-2 bg-[#E69138] text-white rounded-md mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
