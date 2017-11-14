import React from 'react';
import { Provider } from 'react-redux';
import store from './Reducers';
import './app.css';

import AppRouter from './Components/AppRouter';

export function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default function ConnectedApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
