import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUser } from "./signinSlice";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://146.190.176.10/api",
});

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
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
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
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
