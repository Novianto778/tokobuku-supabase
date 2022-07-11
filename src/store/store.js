import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import modalReducer from './modalSlice'

const store = configureStore({
  reducer: {
    book: bookReducer,
    modal: modalReducer,
  },
});

export default store;
