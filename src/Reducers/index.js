/* global localStorage */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { reducer as form } from 'redux-form';

import { AUTH_USER } from '../Actions/types';
import graph from './GraphReducer';
import auth from './authReducer';

export const rootReducer = combineReducers({
  graph,
  auth,
  form,
});

const createStoreWithMiddleware = applyMiddleware(createLogger(), ReduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');
const userRoles = localStorage.getItem('userRoles');
const user = userRoles ? { roles: JSON.parse(userRoles) } : { roles: {} };

if (token) {
  store.dispatch({ type: AUTH_USER, payload: user });
}

export default store;
