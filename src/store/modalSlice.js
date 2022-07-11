import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showDeleteModal: false,
    selectedBookTitle: ""
  },
  reducers: {
    openModal: (state, action) => {
      state.showDeleteModal = true
      state.selectedBookTitle = action.payload
    },
    hideModal: (state) => {
      state.showDeleteModal = false
    },

  },
  extraReducers: {},
});

export const { openModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
