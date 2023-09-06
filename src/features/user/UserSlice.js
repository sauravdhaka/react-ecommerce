import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders , updateUser , fetchLoggedInUser } from './UserAPI';

const initialState = {
 
  status: 'idle',
  userInfo : null // this will have more innfo
};


export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    },
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // tihis info can be diffrent or more from logged-in user info
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // earlier there was loggedinUser variable in other slice
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

// TODO : change orders and dddress to be independent
export const selectUserOrders = (state) =>state.user.userInfo.orders
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserInfo = (state) => state.user.userInfo


export default userSlice.reducer;
