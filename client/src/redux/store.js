import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import authReducer from "./auth/authSlice"
import cartReducer from "./cart/cartSlice"
import userReducer from "./user/userSlice"
import orderReducer from "./order/orderSlice"


const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
  },
});

export default store;
