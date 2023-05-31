import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LoginState {
  admin: boolean;
}

const initialState: LoginState = {
  admin: false
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state) => {
      state.admin = true;
    },
    setNotAdmin: (state) => {
      state.admin = false;
    }
  }
});

export const { setAdmin, setNotAdmin } = adminSlice.actions;

export const selectLogin = (state: RootState) => state.admin;

export default adminSlice.reducer;
