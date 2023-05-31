import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LoginState {
  admin: boolean;
  hasAccess?: boolean;
}

const initialState: LoginState = {
  admin: false,
  hasAccess: undefined
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
    },
    setHasAccess: (state) => {
      state.hasAccess = true;
    },
    setNotHasAccess: (state) => {
      state.hasAccess = false;
    }
  }
});

export const { setAdmin, setNotAdmin, setHasAccess, setNotHasAccess } =
  adminSlice.actions;

export const selectLogin = (state: RootState) => state.admin;

export default adminSlice.reducer;
