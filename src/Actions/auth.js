/* global localStorage */

import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

const ROOT_URL = 'https://ancient-oasis-46992.herokuapp.com';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}


export function signinUser({ username, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { username, password })
    .then((response) => {
      dispatch({ type: AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    })
    .catch((error) => {
      console.log('err', error)
      dispatch(authError('Please check your username and password.'));
    });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return { type: UNAUTH_USER };
}

export function signupUser({ username, email = '', password, role = 'teacher', school, color, history }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { username, password, email, role, school })
    .then((response) => {
      if (response.data.user.role === 'teacher') {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        history.push('/students');
      }
    })
    .catch((error) => {
      try {
        dispatch(authError(error.response.data.error));
      }
      catch (e) {
        console.log('catch error:', e, 'error was:', error);
        dispatch(authError('Error signing up.'));
      }
    });
  };
}

export function authenticateGoogle(network, socialToken) {
  return axios.post('/api/auth', ({
    body: {
      network: network,
      socialToken: socialToken
    }
  }})
  .then((response) => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })
}
