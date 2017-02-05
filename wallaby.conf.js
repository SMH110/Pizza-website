'use strict';

var path = require('path');

module.exports = function(wallaby) {
    process.env.NODE_PATH = process.env.NODE_PATH +
        path.delimiter + path.join(wallaby.localProjectDir, 'back-end', 'node_modules') +
        path.delimiter + path.join(wallaby.localProjectDir, 'front-end', 'node_modules');

    return {
        files: [
            // Application code
            { pattern: 'back-end/**/*.ts', load: false },
            '!back-end/node_modules/**',
            { pattern: 'front-end/**/*.ts', load: false },
            '!front-end/node_modules/**',
            { pattern: 'shared/**/*.ts', load: false }
        ],
        tests: [
            'specs/unit/**/*.specs.ts'
        ],
        env: {
            type: 'node'
        },
        testFramework: 'mocha',
        workers: {
            recycle: true
        }
    };
};
