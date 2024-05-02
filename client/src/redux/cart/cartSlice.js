import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetcartItem, addCartItem, removeItem, updateCart } from './cartApi';

// add item on cart
export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItem",
  async (item) => {
    const responce = await addCartItem(item)
    if(responce.data.success){
      alert("Add on cart")
      return responce.data
    }else{
      alert("Some thing worng")
    }
  }
)

export const getCartItemAsync = createAsyncThunk(
  "cart/getCartItem",
  async (userId) => {
    const responce = await GetcartItem(userId)
    return responce.data
  }
)

// update
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (data) => {

    const responce = await updateCart(data)
    return responce.data
  }
)

// remove
export const removeItemAsync = createAsyncThunk(
  "cart/removeItem",
  async (id) => {
    const responce = await removeItem(id)
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
        state.cart.result.push(action.payload.cart)
      })
      .addCase(getCartItemAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getCartItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(removeItemAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.cart.result = state.cart.result.filter(item => item._id !== action.payload.cart._id);
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "pending"
      })
      // 
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        const updatedItemIndex = state.cart.result.findIndex(item => item._id === action.payload.cart._id);
        if (updatedItemIndex !== -1) {
          state.cart.result[updatedItemIndex] = action.payload.cart;
        }
      })
  }
});

export const selectedCart = (state) => state.cart.cart

export default cartSlice.reducer;
