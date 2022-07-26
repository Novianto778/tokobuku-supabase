import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import modalReducer from './modalSlice'
import userReducer from './userSlice'
import salesReducer from './salesSlice'

const store = configureStore({
  reducer: {
    book: bookReducer,
    modal: modalReducer,
    user: userReducer,
    sales: salesReducer
  },
});

export default store;
