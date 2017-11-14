import {
  FETCH_NODES,
  FETCH_NODES_ERROR,
  FETCH_NODES_SUCCESS,
} from '../Actions/types';
import { defaultAsync, defaultLoading } from './utility';

export const defaultState = {
  nodes: {},
  ...defaultAsync,
};

export default function graphReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_NODES:
      return { ...state, ...defaultLoading };
    case FETCH_NODES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case FETCH_NODES_SUCCESS:
      return {
        ...state,
        nodes: action.payload,
        ...defaultAsync,
        fetched: true,
      };
    default:
      return state;
  }
}
