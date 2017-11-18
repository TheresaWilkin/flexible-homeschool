/* global localStorage */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import form from './formReducer';

import { AUTH_USER } from '../Actions/types';
import auth from './authReducer';
import students from './studentReducer';

export const rootReducer = combineReducers({
  students,
  auth,
  form
});

const createStoreWithMiddleware = applyMiddleware(createLogger(), ReduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token) {
  store.dispatch({ type: AUTH_USER, payload: JSON.parse(user) });
}

export default store;
