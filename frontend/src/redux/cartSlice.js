import { API } from "@/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch User Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().user.user?.token; // ✅ Token Redux se lo
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        };

        const res = await axios.get(`${API}/api/cart/get`, config);
        return res.data.cart;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// ✅ Add to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
        const token = getState().user.user?.token; // ✅ Redux se token lo
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        };

        const res = await axios.post(`${API}/api/cart/add`, { productId, quantity }, config);
        return res.data.cart;
        
    } catch (error) {
        return rejectWithValue(error.response.data.message);
       
    }
});

// ✅ Remove from Cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { getState, rejectWithValue }) => {
    try {
        const token = getState().user.user?.token; // ✅ Redux se token lo
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        };

        const res = await axios.post(`${API}/api/cart/remove`, { productId }, config);
        return res.data.cart;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // ✅ Fetch Cart
            .addCase(fetchCart.pending, (state) => { state.loading = true; })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cartItems;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Add to Cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })

            // ✅ Remove from Cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
