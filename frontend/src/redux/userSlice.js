import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : null, 
  isAuthenticated: localStorage.getItem("userInfo") ? true : false, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // ✅ Save user + token in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userInfo"); // ✅ Remove user data on logout
    },
  },
});

export const { setUser, logout } = userSlice.actions; 
export default userSlice.reducer;
