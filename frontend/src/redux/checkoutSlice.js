import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: null,
  paymentMethod: "",
  orderSummary: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    resetCheckout: (state) => {
      state.shippingAddress = null;
      state.paymentMethod = "";
      state.orderSummary = null;
    },
  },
});

export const {
  setShippingAddress,
  setPaymentMethod,
  setOrderSummary,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
