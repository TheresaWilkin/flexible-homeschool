import { rootReducer as reducer } from '../../Reducers';
import { defaultAsync, defaultLoading } from '../../Reducers/utility';
import {
  FETCH_NODES,
  FETCH_NODES_ERROR,
  FETCH_NODES_SUCCESS,
} from '../../Actions/types';

describe('root reducer', () => {
  it('handles actions with unknown type', () => {
    expect(reducer(undefined, {})).toEqual({ graph: { nodes: {}, ...defaultAsync } });
  });

  it('handles actions of type FETCH_NODES', () => {
    const action = {
      type: FETCH_NODES,
    };
    expect(reducer({}, action)).toEqual({
      graph: { nodes: {}, ...defaultAsync, ...defaultLoading },
    });
  });

  it('handles actions of type FETCH_NODES_ERROR', () => {
    const action = {
      type: FETCH_NODES_ERROR,
      payload: 'Error Fetching',
    };
    expect(reducer({}, action)).toEqual({
      graph: {
        nodes: {}, ...defaultAsync, error: true, errorMessage: 'Error Fetching',
      },
    });
  });

  it('handles actions of type FETCH_NODES_SUCCESS', () => {
    const action = {
      type: FETCH_NODES_SUCCESS,
      payload: { 1: { id: 1, childIds: [1] } },
    };
    expect(reducer({}, action)).toEqual({
      graph: {
        nodes: { 1: { id: 1, childIds: [1] } },
        loading: false,
        ...defaultAsync,
        fetched: true,
      },
    });
  });
});
