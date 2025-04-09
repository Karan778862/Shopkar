// redux/adminOrderSlice.js
import { API } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const { data } = await axios.get(`${API}/api/order/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.orders;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const { data } = await axios.put(`${API}/api/order/admin/${id}/update`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        );
      });
  },
});

export default adminOrderSlice.reducer;
