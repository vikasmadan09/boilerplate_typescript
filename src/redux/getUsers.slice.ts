import { createSlice } from '@reduxjs/toolkit';

interface IState {
  isLoading: boolean;
  error: string;
  data: any;
}

const initialState: IState = {
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
      state.isLoading = false;
      state.data = action.payload;
      state.error = '';
    },
    clearData: (state) => {
      state.isLoading = false;
      state.data = [];
      state.error = '';
    },
  },
});
export const { fetchData, clearData } = getUsersSlice.actions;

export default getUsersSlice.reducer;
