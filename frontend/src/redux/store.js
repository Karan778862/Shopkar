import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Make sure path sahi ho
import productReducer from "./productSlice";
import singleProductReducer from "./singleProductSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice"
import orderReducer from "./orderSlice";
import adminOrdersReducer from "../redux/adminOrderSlice";

// Store Create Karo
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store; // ✅ Correct export
