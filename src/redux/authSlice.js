import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/Auth/login", { email, password });

//       const { token } = res.data;
//       localStorage.setItem("token", token);

//       return token; // we'll decode it separately
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await axios.get("/api/Auth/decode-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      return res.data;
    } catch (err) {
      localStorage.removeItem("token");
      return rejectWithValue("Invalid or expired token");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      // .addCase(login.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.token = action.payload;
      //   state.isAuthenticated = true;
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      // Load user from token
      .addCase(loadUserFromToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        // state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
