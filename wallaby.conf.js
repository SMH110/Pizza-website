const path = require("path");

module.exports = function(wallaby) {
  process.env.NODE_PATH =
    process.env.NODE_PATH +
    path.delimiter +
    path.join(wallaby.localProjectDir, "back-end", "node_modules") +
    path.delimiter +
    path.join(wallaby.localProjectDir, "front-end", "node_modules");

  return {
    files: [
      // Application code
      { pattern: "**/*.ts", load: false },
      "!**/node_modules/**",
      "!specs/**/*.spec.ts"
    ],
    tests: ["specs/unit/**/*.spec.ts"],
    env: {
      type: "node"
    },
    testFramework: "mocha",
    workers: {
      recycle: true
    },
    setup: function() {
      require("chai").config.truncateThreshold = 0;
    }
  };
};
