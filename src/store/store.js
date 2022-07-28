import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import modalReducer from './modalSlice'
import userReducer from './userSlice'
import salesReducer from './salesSlice'
import customerReducer from './customerSlice'

const store = configureStore({
  reducer: {
    book: bookReducer,
    modal: modalReducer,
    user: userReducer,
    sales: salesReducer,
    customer: customerReducer
  },
});

export default store;
