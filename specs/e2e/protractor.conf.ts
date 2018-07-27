import { cpus } from "os";

export let config = {
  allScriptsTimeout: 30000,
  baseUrl: "http://localhost:3000",
  framework: "mocha",
  specs: ["./**/*.spec.ts"],
  capabilities: {
    browserName: "chrome",
    shardTestFiles: process.env.SHARDING_DISABLED ? false : true,
    maxInstances: process.env.SHARDING_DISABLED ? 1 : cpus().length,
    chromeOptions: {
      args: ["--test-type", "--no-sandbox"]
    }
  },
  mochaOpts: {
    reporter: "spec",
    timeout: 5 * 60 * 1000
  }
};
