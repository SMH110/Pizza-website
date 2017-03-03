export let config = {
  allScriptsTimeout: 30000,
  baseUrl: "http://localhost:3000",
  framework: "mocha",
  specs: [
    "./**/*.specs.ts"
  ],
  capabilities: {
    browserName: "chrome"
  },
  mochaOpts: {
    reporter: 'spec',
    timeout: 5 * 60 * 1000
  }
};
