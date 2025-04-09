// src/redux/singleProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch single product
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(`http://localhost:3001/api/product/single/${id}`);
    return response.data; // Return product data
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: { product: {}, loading: false, error: null },
  reducers: {
    // Action to clear the product data from the Redux store
    clearSingleProduct: (state) => {
      state.product = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSingleProduct } = singleProductSlice.actions;
export default singleProductSlice.reducer;
