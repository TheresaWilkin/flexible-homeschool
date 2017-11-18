import {
  FETCH_STUDENTS,
  NEW_STUDENT,
  STUDENTS_ERROR,
} from '../Actions/types';

const defaultState = {
  byId: {},
  all: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        ...action.payload
      };
    case NEW_STUDENT: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload
        },
        all: [...state.all, action.payload._id]
      }
    }
    default:
      return state;
  }
}
