import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrder, resetCart, updateStatus } from './orderApi';

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const responce = await createOrder(order)
    return responce.data
  }
)

export const resetCartAsync = createAsyncThunk(
  "order/resetCart",
  async (id) => {
    const responce = await resetCart(id)
    return responce.data
  }
)
export const fetchAllOrderAsync = createAsyncThunk(
  "order/fetchAllOrder",
  async () => {
    const responce = await fetchAllOrder()
    return responce.data
  }
)
export const updateStatusAsync = createAsyncThunk(
  "order/updateStatus",
  async (update) => {
    const responce = await updateStatus(update)
    return responce.data
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    currentOrder: null
  },
  reducers: {

  },
  extraReducers: (bulder) => {
    bulder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.order.push(action.payload.order)
        state.currentOrder = action.payload
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "Loading"
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "success",
          state.order = []
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = "Loading"
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = "success",
          state.order = action.payload.order
      })
      .addCase(updateStatusAsync.pending, (state) => {
        state.status = "Loading"
      })
      .addCase(updateStatusAsync.fulfilled, (state, action) => {
        state.status = "success"
        const index = state.order.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.order[index].status = action.payload.status;
        }
      })
  }
});

export const selectOrder = (state) => state.order.order
export const selectCurrentOrder = (state) => state.order.currentOrder
export default orderSlice.reducer;
