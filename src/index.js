'use strict';

let node = require('./node');

let getValue = node.getValue;
let setValue = node.setValue;
let hasValue = node.hasValue;
let removeValue = node.removeValue;
let clearNode = node.clearNode;
let isRemovableNode = node.isRemovableNode;
let removeKey = node.removeKey;
let getNextNode = node.getNextNode;
let addUniqueKey = node.addUniqueKey;

/**
 * store value by keys
 *
 * ('a') -> v0
 *
 * ('a', 'b', 'c') -> v1,
 *
 * ('c', k, 'd') -> v2
 *
 * node {
 *      nextMap: {},
 *      nextList: [],
 *      type,
 *      value
 * }
 *

{
    type: unique,
    data: {
        nextMap: {
            'a': {
                nextMap: {
                    'b': {
                        nextMap: {
                            'c': {
                                type: unique,
                                value: v1
                            }
                        }
                    }
                },
                type: unique,
                value: v0
            },
            'c': {
                nextList: [
                    [k, {
                        nextMap: {
                            'd': {
                                type: unique,
                                value: v2
                            }
                        }
                    }]
                ]
            }
        }
    }
}
*/

let set = (keys, value, eq, tree) => {
    let unique = tree.unique;
    let node = tree.root;
    for (let i = 0; i < keys.length; i++) {
        node = addUniqueKey(node, keys[i], eq);
    }
    setValue(node, value, unique);
};

let get = (keys, eq, tree) => {
    let unique = tree.unique;
    let node = getNode(keys, eq, tree);
    if (!node) {
        return;
    }
    return getValue(node, unique);
};

let has = (keys, eq, tree) => {
    let unique = tree.unique;
    let node = getNode(keys, eq, tree);
    if (!node) {
        return false;
    }
    return hasValue(node, unique);
};

let getNode = (keys, eq, tree) => {
    let node = tree.root;
    for (let i = 0; i < keys.length; i++) {
        node = getNextNode(node, keys[i], eq);
        if (!node) {
            return;
        }
    }
    return node;
};

let remove = (keys, eq, tree) => {
    let unique = tree.unique;
    let node = getNode(keys, eq, tree);
    if (!node) {
        return;
    }
    if(!hasValue(node, unique)) {
        return;
    }
    removeValue(node);
    clearNode(node);
    while(isRemovableNode(node, unique) && keys.length) {
        let key = keys.pop();
        node = getNode(keys, eq, tree);
        removeKey(node, key, eq);
        clearNode(node);
    }
};

module.exports = () => {
    let tree = {
        unique: {},
        root: {}
    };
    return {
        set: (keys, value, eq) => set(keys, value, eq, tree),
        get: (keys, eq) => get(keys, eq, tree),
        has: (keys, eq) => has(keys, eq, tree),
        remove: (keys, eq) => remove(keys, eq, tree)
    };
};
