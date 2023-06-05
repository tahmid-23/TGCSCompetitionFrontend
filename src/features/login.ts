import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LoginState {
  admin?: number;
  hasAccess?: number;
}

const initialState: LoginState = {
  admin: undefined,
  hasAccess: undefined
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAdmin: (state) => {
      state.admin = Date.now();
    },
    setNotAdmin: (state) => {
      state.admin = undefined;
    },
    setHasAccess: (state) => {
      state.hasAccess = Date.now();
    },
    setNotHasAccess: (state) => {
      state.hasAccess = undefined;
    }
  }
});

export const { setAdmin, setNotAdmin, setHasAccess, setNotHasAccess } =
  loginSlice.actions;

export const selectLogin = (state: RootState) => {
  return {
    admin: state.login.admin
      ? Date.now() - state.login.admin <= 24 * 60 * 60 * 1000
      : false,
    hasAccess: state.login.hasAccess
      ? Date.now() - state.login.hasAccess <= 24 * 60 * 60 * 1000
      : false
  };
};

export default loginSlice.reducer;
