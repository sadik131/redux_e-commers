import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import userReducer from "./auth/authSlice"
import cartReducer from "./cart/cartSlice"


const store = configureStore({
  reducer: {
    product: productReducer,
    auth: userReducer,
    cart: cartReducer,
  },
});

export default store;
