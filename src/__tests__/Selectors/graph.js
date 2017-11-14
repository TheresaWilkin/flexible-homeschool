import {
  getGraphNodes,
  getGraphRoot,
  makeIsCyclical,
  makeGetLeafNodes,
  makeGetSourceNodes,
} from '../../Selectors/graph';
import { defaultState } from '../../Reducers/GraphReducer';

// setup sample data
const nodes = {
  1: { id: 1, childIds: [2] },
  2: { id: 2, childIds: [] },
};

const cyclicalNodes = {
  1: { id: 1, childIds: [2] },
  2: { id: 2, childIds: [1] },
};

const filledState = {
  graph: {
    root: 1,
    nodes,
    loading: false,
    error: {
      error: false,
      message: '',
    },
  },
};

const isCyclical = makeIsCyclical();
const getLeafNodes = makeGetLeafNodes();
const getSourceNodes = makeGetSourceNodes();

describe('graph selectors', () => {
  it('getGraphNodes', () => {
    expect(getGraphNodes({ graph: defaultState })).toEqual({});
    expect(getGraphNodes(filledState)).toEqual(nodes);
  });

  it('getGraphRoot', () => {
    expect(getGraphRoot(filledState)).toEqual(1);
  });

  it('isCyclical', () => {
    expect(isCyclical.resultFunc(nodes, 1)).toEqual(false);
    expect(isCyclical.resultFunc(cyclicalNodes, 1)).toEqual(true);
  });

  it('getLeafNodes', () => {
    expect(getLeafNodes.resultFunc(nodes, 1)).toEqual(['2']);
    expect(getLeafNodes.resultFunc(cyclicalNodes, 1)).toEqual([]);
  });

  it('getSourceNodes', () => {
    expect(getSourceNodes.resultFunc(nodes, 1)).toEqual(['1']);
    expect(getSourceNodes.resultFunc(cyclicalNodes, 1)).toEqual([]);
  });
});
