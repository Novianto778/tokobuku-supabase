import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import modalReducer from './modalSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    book: bookReducer,
    modal: modalReducer,
    user: userReducer
  },
});

export default store;
