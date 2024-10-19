import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const fakeUser = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
          });
        }, 1000);
      });
      return fakeUser;
    } catch (error) {
      return rejectWithValue("Failed to sign in.");
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.status = "idle";
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { signOut } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
