import axios from 'axios';
import { FETCH_STUDENTS } from './types';
import { ROOT_URL } from './constants';

export function fetchStudents(schoolId) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/school/${schoolId}/students`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_STUDENTS,
        payload: response.data.users
      });
    })
    .catch(response => {
      //dispatch error
    });
  }
}
