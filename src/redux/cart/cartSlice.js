import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetcartItem, addCartItem } from './cartApi';

// add item on cart
export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItem",
  async (item) => {
    const responce = await addCartItem(item)
    return responce.data
  }
)

export const getCartItemAsync = createAsyncThunk(
  "cart/getCartItem",
  async (userId) => {
    const responce = await GetcartItem(userId)
    return responce.data
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {

  },
  extraReducers: (bulder) => {
    bulder
      .addCase(addCartItemAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        state.cart.push(action.payload)
      })
      .addCase(getCartItemAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getCartItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
  }
});

export const selectedCart = (state) => state.cart.cart

export default cartSlice.reducer;
