'use strict';

module.exports = function (wallaby) {
  return {
    files: [
      // Application code
      { pattern: 'app/**/*.ts', load: false },
      { pattern: 'spec/mocha-setup.ts', load: false }
    ],
    tests: [
      'spec/**/*.spec.ts'
    ],
    env: {
      type: 'node'
    },
    setup: function () {
      require('./spec/mocha-setup');
    },
    testFramework: 'mocha',
    compilers: {
      "**/*.ts": wallaby.compilers.typeScript({ module: 'commonjs', target: 2 })
    }
  };
};