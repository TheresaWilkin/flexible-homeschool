import {reducer as formReducer} from 'redux-form';
import {
  NEW_STUDENT,
} from '../Actions/types';

export default formReducer.plugin({
  signupStudent: (state, action) => {
    switch(action.type) {
      case NEW_STUDENT:
        return undefined;
      default:
        return state;
    }
  }
});
