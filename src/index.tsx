import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppWrapper from './components/AppWrapper/AppWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="137428427095-vqpg050per1vo4olnmmak8not0kib7uk.apps.googleusercontent.com">
        <AppWrapper />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
