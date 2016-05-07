# keysmap

Multiple keys mapping. Allow none-string keys.

[![Build Status](https://travis-ci.org/LoveKino/cl-ellipsis.svg)](https://travis-ci.org/LoveKino/keysmap.svg)
[![Coverage Status](https://coveralls.io/repos/github/LoveKino/cl-ellipsis/badge.svg?branch=master)](https://coveralls.io/github/LoveKino/keysmap?branch=master)

## what is keysmap

It's map, but a group of multiple keys mapping one value.

eg:
```js
['a', 'b', 'c'] -> v0

['a'] -> v1

['d', 10, {}] -> v2
```

## install

`npm i keysmap --save`

## api

- var map = keysmap();

create map instance

- map.set (keys, value[, eq]) 

Keys object is an array. It's element could be anything.

Eq is function, used to compare two key.

`eq = (key1, key2) => {};// return true or false;`

- map.get (keys[, eq])

Keys object is an array. It's element could be anything.

Eq is function, used to compare two key.

- map.has (keys[, eq])

Keys object is an array. It's element could be anything.

Eq is function, used to compare two key.

- map.remove(keys[, eq])

Keys object is an array. It's element could be anything.

Eq is function, used to compare two key.

## examples

### multiple key

```js
var keysmap = require('keysmap')

var map = keysmap();

map.set(['a', 'b', 'c'], 4);

var ret = map.get(['a', 'b', 'c']);

console.log(ret); // 4
```

### empty key

```js
var keysmap = require('keysmap')

var map = keysmap();

map.set([], {a: 1});

var ret = map.get([]);

console.log(ret); // {a: 1}

```

### object keys

```js
var keysmap = require('keysmap')

var map = keysmap();

let obj = {};

map.set([1, obj], 20);

map.get([1, obj]); // 20
```

### custome eq function

```js
var keysmap = require('keysmap');
var jsoneq = require('cl-jsoneq');

var map = keysmap();

map.set(['a', {
    b: 30
}], 300);

map.get(['a', {
    b: 30
}]); // undefined

map.get(['a', {
    b: 30
}], jsoneq); // 300
```

### has and remove api

```js
var keysmap = require('keysmap');
var jsoneq = require('cl-jsoneq');

map.set(['a', 'b'], 20);
map.set([{
    k: 3
}], 20);

map.has(['a', 'b']); // true
map.has([{
    k: 3
}], jsoneq); // true


map.remove(['a', 'b']);
map.remove([{
    k: 3
}], jsoneq);
```
