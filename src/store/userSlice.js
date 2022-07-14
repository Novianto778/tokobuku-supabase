import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "services/supabaseClient";

export const signInUser = createAsyncThunk("user/signInUser", async (data) => {
  const { user, error } = await supabase.auth.signIn(data);
  return { user, error };
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    session: null,
    error: "",
  },
  reducers: {
    authStateChange: (state, action) => {
      state.session = action.payload;
    }
  },
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = action.payload.error?.message;
    },
    [signInUser.pending]: (state) => {
      state.loading = true;
    },
    [signInUser.rejected]: (state) => {
      state.loading = false;
      state.error = "Sign in failed";
    },
  },
});

export const { authStateChange } = userSlice.actions;

export default userSlice.reducer;
