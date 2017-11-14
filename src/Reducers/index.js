/* global localStorage */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { reducer as form } from 'redux-form';

import { AUTH_USER } from '../Actions/types';
import auth from './authReducer';

export const rootReducer = combineReducers({
  auth,
  form,
});

const createStoreWithMiddleware = applyMiddleware(createLogger(), ReduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');
const userRole = localStorage.getItem('userRole');
const user = userRole ? { role: JSON.parse(userRole) } : { role: '' };

if (token) {
  store.dispatch({ type: AUTH_USER, payload: user });
}

export default store;
