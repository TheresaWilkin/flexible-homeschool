import {
  FETCH_STUDENTS,
  NEW_STUDENT,
  STUDENTS_ERROR,
} from '../Actions/types';

const defaultState = {
  byId: {},
  all: [],
  error: false,
  errorMessage: ''
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        ...action.payload,
        error: false,
        errorMessage: ''
      };
    case NEW_STUDENT: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload
        },
        all: [...state.all, action.payload._id],
        error: false,
        errorMessage: ''
      }
    }
    case STUDENTS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload
      }
    default:
      return state;
  }
}
