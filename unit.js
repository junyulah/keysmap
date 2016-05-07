var quick = require('defcomment/ext/quick');
quick({
    srcDir: __dirname + '/src', // your source directory
    distDir: __dirname + '/test/unit/ret', // some place to hold compiled code, do not use these code for other usage.
    testDir: __dirname + '/test/unit/test' // some place to hold your generated tests.
});
