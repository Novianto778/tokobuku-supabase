import { createSlice } from "@reduxjs/toolkit";

export const salesSlice = createSlice({
  name: "sales",
  initialState: {
    transaction: [
      // { no: 1, id: 1, title: "test", qty: 2, price: 100000, discount: 0.1 },
      // { no: 2, id: 2, title: "test 2", qty: 1, price: 65000, discount: 0.2 },
    ],
    selectedCustomer: null,
  },
  reducers: {
    deleteTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    addTransaction: (state, { payload }) => {
      const existItem = [...state.transaction].find(
        (item) => item.id === payload.id
      );
      if (existItem) {
        const newTransaction = [...state.transaction].map((item) =>
          item.id === payload.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
        state.transaction = newTransaction;
      } else {
        state.transaction = [
          ...state.transaction,
          {
            ...payload,
            qty: 1,
          },
        ];
      }
    },
  },
  extraReducers: {},
});

export const { deleteTransaction, setSelectedCustomer, addTransaction } =
  salesSlice.actions;

export default salesSlice.reducer;
