import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../Actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        error: false,
        errorMessage: '',
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        user: { role: '' },
        error: false,
        errorMessage: '',
      };
    case AUTH_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}
