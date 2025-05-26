import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
    },
    clearUser: (state, action) => {
      state.user = null;
      state.userLoading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
