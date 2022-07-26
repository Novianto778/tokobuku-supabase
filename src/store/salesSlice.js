import { createSlice } from "@reduxjs/toolkit";

export const salesSlice = createSlice({
  name: "sales",
  initialState: {
    transaction: [
      { no: 1, id: 1, title: "test", qty: 2, price: 100000, discount: 0.1 },
      { no: 2, id: 2, title: "test 2", qty: 1, price: 65000, discount: 0.2 },
    ],
  },
  reducers: {
    deleteTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
  extraReducers: {},
});

export const { deleteTransaction } = salesSlice.actions;

export default salesSlice.reducer;
