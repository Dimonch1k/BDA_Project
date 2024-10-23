import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { feedbacks } from "../../data/dummy";

export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (bookId) => {
    const filteredFeedbacks = feedbacks.filter(
      (feedback) => feedback.bookId === bookId
    );
    return filteredFeedbacks;
  }
);

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async ({ bookId, feedback }) => {
    const response = await axios.post(
      `/api/books/${bookId}/feedbacks`,
      feedback
    );
    return response.data;
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      });
  },
});

export const selectFeedbackByBook = (state, bookId) =>
  state.feedback.feedbacks.filter((f) => f.bookId === bookId);

export default feedbackSlice.reducer;
