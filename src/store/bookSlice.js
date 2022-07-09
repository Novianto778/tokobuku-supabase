import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "services/supabaseClient";

export const fetchBook = createAsyncThunk("book/fetchBook", async () => {
  let { data: book, error } = await supabase.from("book").select(`
    *,
    book_category (
      name_category
    )
  `);
  return {book, error};
});

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: [],
    pending: false,
    error: null
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
    },
  },
});

export default bookSlice.reducer;
