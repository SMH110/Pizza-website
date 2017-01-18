export let config = {
  allScriptsTimeout: 30000,
  baseUrl: "http://localhost:3000",
  framework: "jasmine2",
  specs: [
    "./**/*.specs.js"
  ],
  capabilities: {
    browserName: "chrome"
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 5 * 60 * 1000
  }
};
