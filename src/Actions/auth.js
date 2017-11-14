/* global localStorage */

import axios from 'axios';
// // MOCK
// import MockAdapter from 'axios-mock-adapter';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

const ROOT_URL = 'https://ancient-oasis-46992.herokuapp.com';

// // MOCKS
// const mock = new MockAdapter(axios);
// mock.onPost(`${ROOT_URL}/signin`).reply(
//   200,
//   { token: 'abc', user: { roles: { user: true } } },
// );
// mock.onPost(`${ROOT_URL}/signup`).reply(
//   200,
//   { token: 'abc', user: { roles: { user: true } } },
// );

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}


export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRoles', JSON.stringify(response.data.user.roles));
      })
      .catch(() => {
        dispatch(authError('Bad Sign-in Info'));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRoles');

  return { type: UNAUTH_USER };
}

export function signupUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRoles', JSON.stringify(response.data.user.roles));
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
}
