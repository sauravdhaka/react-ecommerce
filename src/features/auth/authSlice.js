import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser , checkUser , signOut  } from './authAPI';
import { updateUser } from '../user/UserAPI';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error : null
};


export const CreateUserAsync = createAsyncThunk(
  'user/CreateUser',
  async (userData) => {
    const response = await CreateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);





export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo ,{rejectWithValue}) => {
    try {
      const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
    
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userId) => {
    const response = await signOut(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      });
  },
});


export const selectLoggedInUser = (state)=> state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error
export const { increment } = authSlice.actions;




export default authSlice.reducer;
