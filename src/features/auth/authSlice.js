import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser , loginUser , signOut , checkAuth } from './authAPI';
import { updateUser } from '../user/UserAPI';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error : null,
  userChecked : false
};


export const CreateUserAsync = createAsyncThunk(
  'user/CreateUser',
  async (userData) => {
    const response = await CreateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);





export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo ,{rejectWithValue}) => {
    try {
      const response = await loginUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
    
  }
);


export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    } catch (error) {
      console.log(error)
      
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
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      });
  },
});


export const selectLoggedInUser = (state)=> state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error
export const selectUserChecked = (state) => state.auth.userChecked




export default authSlice.reducer;
