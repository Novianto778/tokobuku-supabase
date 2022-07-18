import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "services/supabaseClient";

export const fetchBook = createAsyncThunk("book/fetchBook", async () => {
  let { data: book, error } = await supabase.from("book").select(`
    *,
    book_category (
      name_category
    )
  `);
  return { book, error };
});

export const fetchBookCategory = createAsyncThunk(
  "book/fetchBookCategory",
  async () => {
    let { data: book_category, error } = await supabase
      .from("book_category")
      .select("*");

    return { book_category, error };
  }
);

export const deleteBookById = createAsyncThunk(
  "book/deleteBookById",
  async (id) => {
    const { data, error } = await supabase.from("book").delete().eq("id", id);
    return { data, error, deleting: false };
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: [],
    pending: false,
    error: null,
    deletedBookTitle: "",
    deleting: false,
    book_category: [],
  },
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.pending = true;
    },
    [fetchBook.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.book = action.payload.book;
      state.pending = false;
    },
    [fetchBookCategory.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [fetchBookCategory.fulfilled]: (state, action) => {
      state.book_category = action.payload.book_category;
      state.pending = false;
    },
    [deleteBookById.pending]: (state) => {
      state.deleting = true;
    },
    [deleteBookById.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [deleteBookById.fulfilled]: (state, action) => {
      state.deletedBookTitle = action.payload.data;
      state.deleting = false;
    },
  },
});

export default bookSlice.reducer;
