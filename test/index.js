'use strict';

let keysmap = require('../src');
let assert = require('assert');
let jsoneq = require('cl-jsoneq');

describe('keysmap', () => {
    it('sample', () => {
        let map = keysmap();
        map.set(['a', 'b', 'c'], 4);
        assert.equal(map.get(['a', 'b', 'c']), 4);
    });

    it('empty key', () => {
        let map = keysmap();
        map.set([], 100);
        assert.equal(map.get([]), 100);
    });

    it('none-string key', () => {
        let map = keysmap();
        let obj = {};
        map.set([1, obj], {
            a: 10
        });

        assert.deepEqual(map.get([1, obj]), {
            a: 10
        });
    });

    it('jsoneq for get', () => {
        let map = keysmap();
        map.set(['a', {
            b: 30
        }], 300);
        assert.equal(map.get(['a', {
            b: 30
        }], jsoneq), 300);
    });

    it('jsoneq for set', () => {
        let map = keysmap();
        map.set(['a', {
            b: 30
        }], 300);
        map.set(['a', {
            b: 30
        }], 100, jsoneq);

        assert.equal(map.get(['a', {
            b: 30
        }], jsoneq), 100);

    });

    it('get fail', () => {
        let map = keysmap();
        map.set(['a', 'b', true], 20);
        assert.equal(map.get(['d']), undefined);
        assert.equal(map.get(['a', 'd']), undefined);
        assert.equal(map.get(['a']), undefined);
        assert.equal(map.get(['a', 'b', false]), undefined);
    });

    it('override', () => {
        let map = keysmap();
        map.set(['a', 'b'], 20);
        map.set(['a', 'b'], 100);
        assert.equal(map.get(['a', 'b']), 100);
    });

    it('has', () => {
        let map = keysmap();
        map.set(['a', 'b'], 20);
        map.set([{
            k: 3
        }], 20);
        assert.equal(map.has(['a', 'b']), true);
        assert.equal(map.has(['a']), false);
        assert.equal(map.has(['b']), false);
        assert.equal(map.has([{
            k: 3
        }], jsoneq), true);
    });

    it('remove one', () => {
        let map = keysmap();
        map.set(['a', 'b'], 20);
        map.set(['a'], 30);
        map.remove(['a']);
        map.remove(['a', 'b']);
        assert.equal(map.has(['a', 'b']), false);
        assert.equal(map.get(['a', 'b']), undefined);
        assert.equal(map.has(['a']), false);

        map.set(['a', 'b'], 20);
        assert.equal(map.has(['a', 'b']), true);
        assert.equal(map.get(['a', 'b']), 20);
    });

    it('remove two', () => {
        let map = keysmap();
        map.set([{
            a: 20
        }, 10], 50, jsoneq);

        map.set([{
            a: 20
        }, 20], 60, jsoneq);

        map.remove([{
            a: 20
        }, 10], jsoneq);
        assert.equal(map.has([{
            a: 20
        }, 10], jsoneq), false);
    });

    it('remove three', () => {
        let map = keysmap();
        map.set([{
            a: 20
        }], 50, jsoneq);

        map.set([{
            a: 20
        }, 20], 60, jsoneq);

        map.remove([{
            a: 20
        }], jsoneq);


        map.remove([{
            a: 20
        }, 20], jsoneq);

        assert.equal(map.has([{
            a: 20
        }], jsoneq), false);

        assert.equal(map.has([{
            a: 20
        }, 20], jsoneq), false);
    });


    it('remove fail', () => {
        let map = keysmap();
        map.set(['a', 'b'], 20);
        map.remove(['a']);
        map.remove(['e']);
        assert.equal(map.has(['a', 'b']), true);
        assert.equal(map.get(['a', 'b']), 20);
    });
});
