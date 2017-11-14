
/**
 * This function gets the root node of an array of nodes.
 * @param {Array} nodesArray an array of node objects, format [{ id: 1 }]
 * @returns {string} the lowest id
 */
export function getRoot(nodesArray) {
  return Math.min(...nodesArray.map(node => node.id));
}

/**
 * This function gets the child ids of a node
 * @param {Object} node a node, format [{ id: 1, childIds: [2] }]
 * @returns {Array} the childIds of the node
 */
export function getChildIds(node) {
  return node.childIds;
}

/**
 * This function reformats a node after getting it from an API
 * @param {Object} node a node, format [{ id: 1, childIds: [2] }]
 * @returns {Object} the reformatted node
 */
export function formatNode(node) {
  return { ...node, childIds: getChildIds(node) };
}

/**
 * This function changes an array of objects into an object of objects with ids as keys
 * @param {Array} array an array of objects
 * @param {string} idKey the key for the id property of the element objects, e.g. 'id'
 * @param {function} factory a function which reformats the inner objects
 * @returns {Object} the object of objects
 @example arrayToObject([{ id: 1 }], 'id', (object) => object);
 */
export function arrayToObject(array, idKey, factory) {
  return array.reduce((acc, cur) => {
    acc[cur[idKey]] = factory(cur);
    return acc;
  }, {});
}
