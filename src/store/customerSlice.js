import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "services/supabaseClient";

export const fetchCustomer = createAsyncThunk("customer/fetchCustomer", async () => {
  let { data: customer, error } = await supabase
  .from('customer')
  .select('*')
  return { customer, error };
});

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: [],
    pending: false,
    error: null,
  },
  extraReducers: {
    [fetchCustomer.pending]: (state) => {
      state.pending = true;
    },
    [fetchCustomer.rejected]: (state, action) => {
      state.error = action.payload.error;
    },
    [fetchCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload.customer;
      state.pending = false;
    },
  },
});

export default customerSlice.reducer;
