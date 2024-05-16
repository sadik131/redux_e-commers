import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUserAddress, fetchUser, orderbyUserId, updateUser, updateUseraddrss } from './UserApi';

export const fetchUserAsync = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const responce = await fetchUser()
    return responce.data
  }
)
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (info) => {
    const responce = await updateUser(info)
    return responce.data
  }
)
export const orderbyUserIdAsync = createAsyncThunk(
  "user/orderbyUserId",
  async (id) => {
    const responce = await orderbyUserId(id)
    return responce.data
  }
)

export const deleteUserAddressAsync = createAsyncThunk(
  "user/deleteUserAddress",
  async (info) => {
    const responce = await deleteUserAddress(info)
    return responce.data
  }
)

export const updateUseraddrssAsync = createAsyncThunk(
  "user/updateUseraddrss",
  async ({ user, updatedAddress, editAddress }) => {
    const response = await updateUseraddrss({ user, updatedAddress, editAddress });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: "",
    order: []
  },
  reducers: {

  },
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload.user
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload.user
      })
      .addCase(orderbyUserIdAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(orderbyUserIdAsync.fulfilled, (state, action) => {
        state.order = action.payload.result
      })
      .addCase(updateUseraddrssAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(updateUseraddrssAsync.fulfilled, (state, action) => {
        const updatedAddress = action.payload.updatedAddress;
        state.currentUser.address = state.currentUser.address.map(address => {
          if (address._id === updatedAddress._id) {
            return updatedAddress;
          } else {
            return address;
          }
        });
        state.status = "idle";
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.currentUser = action.payload.user
        state.status = "idle";
      })
      .addCase(deleteUserAddressAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  }
});

export const selectUser = (state) => state.user.currentUser
export const selectUserOrder = (state) => state.user.order
export default userSlice.reducer;
