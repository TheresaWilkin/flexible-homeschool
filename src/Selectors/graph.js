import { createSelector } from 'reselect';
import { getChildIds } from '../utility';
/**
 * This function determines whether a graph is cyclical
 * @param {Object} nodes
 * @param {number} nodeId
 * @param {Array} path (optional) array of ids taken to get to node
 * @returns {boolean} whether graph is cyclical
 */
function isCyclical(nodes, nodeId, path = []) {
  if (path.includes(nodeId)) {
    return true;
  }
  return getChildIds(nodes[nodeId]).some(child => isCyclical(nodes, child, [...path, nodeId]));
}

/**
 * This function determines whether a node has children
 * @param {Object} node
 * @returns {boolean} whether node has children
 */
function hasChildren(node) {
  return getChildIds(node).length > 0;
}

/**
 * This function returns nodes without children from a graph
 * @param {Object} nodes
 * @returns {Array} ids of leaf nodes
 */
function getLeafNodes(nodes) {
  return Object.keys(nodes).filter(nodeId => !hasChildren(nodes[nodeId]));
}

/**
 * This function returns nodes without parents from a graph
 * @param {Object} nodes
 * @returns {Array} ids of source nodes
 */
function getSourceNodes(nodes) {
  const childNodes = Object.keys(nodes).reduce((acc, curr) => {
    getChildIds(nodes[curr]).forEach((id) => {
      acc[id] = true;
    });
    return acc;
  }, {});
  return Object.keys(nodes).filter(node => !childNodes[node]);
}

export const getGraphNodes = state => state.graph.nodes;
export const getGraphRoot = state => state.graph.root;

export const makeIsCyclical = () => createSelector(
  [getGraphNodes, getGraphRoot],
  (nodes, root) => isCyclical(nodes, root),
);

export const makeGetLeafNodes = () => createSelector(
  [getGraphNodes],
  nodes => getLeafNodes(nodes),
);

export const makeGetSourceNodes = () => createSelector(
  [getGraphNodes],
  nodes => getSourceNodes(nodes),
);
