import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: '',
  data: {
    results: [],
  },
};

export const getUsersSlice = createSlice({
  name: 'getUsers',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { fetchData } = getUsersSlice.actions;

export default getUsersSlice.reducer;
