import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUser } from "./signinSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: null, email: null },
    status: "idle",
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { signOut, setUserInfo } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
