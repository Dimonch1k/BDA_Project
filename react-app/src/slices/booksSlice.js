import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooksItems = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const response = await fetch("http://localhost:5000/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data;
  }
);

export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
  const response = await fetch("http://localhost:5000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) throw new Error("Failed to add book");

  const data = await response.json();
  return data;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooksItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new book to the state
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllBooks = (state) => state.books.books;
export default booksSlice.reducer;
