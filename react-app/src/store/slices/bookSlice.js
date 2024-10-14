import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

// export const fetchBooksItems = createAsyncThunk(
//   "books/fetchBooks",
//   async () => {
//     const response = await fetch("http://localhost:5000/books");
//     if (!response.ok) {
//       throw new Error("Failed to fetch books");
//     }
//     const data = await response.json();
//     return data;
//   }
// );

// export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
//   const response = await fetch("http://localhost:5000/books", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       ...newBook,
//       id: nanoid(),
//     }),
//   });

//   if (!response.ok) throw new Error("Failed to add book");

//   const data = await response.json();
//   return data;
// });

export const fetchBooksItems = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    // Limit to 10 books
    return data.slice(0, 20);
  }
);

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
    },
    deleteBook(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooksItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// const booksSlice = createSlice({
//   name: "books",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
// extraReducers: (builder) => {
//   builder
//     .addCase(fetchBooksItems.pending, (state) => {
//       state.status = "loading";
//     })
//     .addCase(fetchBooksItems.fulfilled, (state, action) => {
//       state.status = "succeeded";
//       state.items = action.payload;
//     })
//     .addCase(fetchBooksItems.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.error.message;
//     })
//     .addCase(addBook.fulfilled, (state, action) => {
//       state.items.push(action.payload);
//     })
//     .addCase(addBook.rejected, (state, action) => {
//       state.error = action.error.message;
//     });
// },
// });

export const selectAllBooks = (state) => state.books.books;

export const { addBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
