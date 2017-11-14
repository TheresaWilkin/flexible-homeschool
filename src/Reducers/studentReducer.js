import {
  FETCH_STUDENTS,
} from '../Actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
