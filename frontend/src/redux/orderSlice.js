import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 1. Fetch User Orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user; // ✅ Redux se token lo
      const res = await axios.get("http://localhost:3001/api/order", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return res.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ✅ 2. Fetch Single Order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;
      const res = await axios.get(`http://localhost:3001/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return res.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    singleOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ✅ Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Single Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
