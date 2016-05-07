'use strict';

/**
 * node {
 *      nextMap,
 *      nextList,
 *      type,
 *      value
 * }
 */
let getValue = (node, unique) => {
    if (node.type === unique) {
        return node.value;
    }
};

let setValue = (node, value, unique) => {
    node.type = unique;
    node.value = value;
};

let removeValue = (node) => {
    node.type = undefined;
    node.value = undefined;
};

let hasValue = (node, unique) => {
    return node.type === unique;
};

let removeKey = (node, key, eq) => {
    eq = eq || defEq;
    if (isMapKey(key)) {
        node.nextMap[key] = undefined;
    } else {
        let nextList = node.nextList;
        let newNextList = [];
        for (let i = 0; i < nextList.length; i++) {
            let item = nextList[i];
            if (!eq(key, item[0])) {
                newNextList.push(item);
            }
        }
        node.nextList = newNextList;
    }
};

let isRemovableNode = (node, unique) => {
    return !hasValue(node, unique) && !node.nextMap && !node.nextList;
};

let clearNode = (node) => {
    clearNextMap(node);
    clearNextList(node);
};

let clearNextMap = (node) => {
    if (node.nextMap) {
        for (let name in node.nextMap) {
            if (node.nextMap[name]) {
                return;
            }
        }
    }
    node.nextMap = undefined;
};

let clearNextList = (node) => {
    if (node.nextList && !node.nextList.length) {
        node.nextList = undefined;
    }
};

let getNextNode = (node, key, eq) => {
    if (isMapKey(key)) {
        return getNextMapNode(node, key);
    } else {
        return getNextListNode(node, key, eq);
    }
};

let addUniqueKey = (node, key, eq) => {
    let nextNode = getNextNode(node, key, eq);
    if (nextNode) return nextNode;
    return addNextKey(node, key);
};

let addNextMapKey = (node, key) => {
    let nextNode = {};
    node.nextMap = node.nextMap || {};
    node.nextMap[key] = nextNode;
    return nextNode;
};

let addNextKey = (node, key) => {
    if (isMapKey(key)) {
        return addNextMapKey(node, key);
    } else {
        return addNextListKey(node, key);
    }
};

let addNextListKey = (node, key) => {
    let nextNode = {};
    node.nextList = node.nextList || [];
    node.nextList.push([key, nextNode]);
    return nextNode;
};

let getNextMapNode = (node, key) => {
    let nextMap = node.nextMap || {};
    return nextMap[key];
};

let getNextListNode = (node, key, eq) => {
    eq = eq || defEq;
    let nextList = node.nextList || [];
    for (let i = 0; i < nextList.length; i++) {
        let item = nextList[i];
        if (eq(key, item[0])) {
            return item[1];
        }
    }
};

let isMapKey = (key) => {
    return typeof key === 'string' || typeof key === 'symbol';
};

let defEq = (a, b) => a === b;

module.exports = {
    setValue,
    getValue,
    hasValue,
    getNextNode,
    addUniqueKey,
    removeValue,
    isRemovableNode,
    clearNode,
    removeKey
};
