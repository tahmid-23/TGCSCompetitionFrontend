import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './features/login';

export const store = configureStore({
  reducer: {
    admin: adminReducer
  },
  preloadedState: loadState()
});

function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load data', err);
    return undefined;
  }
}

function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Failed to save data', err);
  }
}

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
