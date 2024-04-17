import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './authApi';

// create user
export const fetUserAsync = createAsyncThunk(
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
    loggedinUser: [],
    error: null
  },
  reducers: {

  },
  extraReducers: (bulder) => {
    bulder
      .addCase(fetUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetUserAsync.fulfilled, (state, action) => {
        state.status = "success",
          state.loggedinUser = action.payload
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "success",
          state.loggedinUser = action.payload
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "fail",
        state.error = action.payload
      })
  }
});

export const selectLoggedIn = (state) => state.auth.loggedinUser
export const selectError = (state) => state.auth.error
export default authSlice.reducer;
