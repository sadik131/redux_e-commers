import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, userAddress } from './authApi';

// create user
export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data) => {
    const responce = await createUser(data)
    return responce.data
  }
)

// check user
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (data) => {
    const responce = await checkUser(data)
    return responce.data
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedinUserToken: null,
    error: null
  },
  reducers: {

  },
  extraReducers: (bulder) => {
    bulder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "success",
          state.loggedinUserToken = action.payload
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "success"
        state.loggedinUserToken = action.payload.user
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "fail",
          state.error = action.payload
      })
  }
});

export const selectUserToken = (state) => state.auth.loggedinUserToken
export const selectError = (state) => state.auth.error
export default authSlice.reducer;
