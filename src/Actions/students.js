import axios from 'axios';
import {
  FETCH_STUDENTS,
  NEW_STUDENT,
  STUDENTS_ERROR
} from './types';
import { ROOT_URL } from './constants';

export function studentsError(error) {
  try {
    return {
      type: STUDENTS_ERROR,
      payload: error.response.data.error,
    };
  }
  catch (e) {
    console.log('catch error:', e, 'error was:', error);
    return {
      type: STUDENTS_ERROR,
      payload: 'Error',
    };
  }
}

export function signupStudent({ username, password, school, color = 'blue' }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/students/signup`, { username, password, role: 'student', school, color })
    .then((response) => {
          dispatch({ type: NEW_STUDENT, payload: response.data.user });
    })
    .catch(error => dispatch(studentsError(error)));
  };
}

export function fetchStudents(schoolId) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/school/${schoolId}/students`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ type: FETCH_STUDENTS, payload: response.data.users });
    })
    .catch(error => dispatch(studentsError(error)));
  }
}
