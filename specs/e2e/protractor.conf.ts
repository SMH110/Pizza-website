export let config = {
    allScriptsTimeout: 30000,
    baseUrl: "http://localhost:3000",
    framework: "mocha",
    specs: [
        "./ordering-cash.specs.ts", "./ordering-epdq.specs.ts", "ordering-paypal.specs.ts"
    ],
    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 3,
        chromeOptions: {
            args: ['--test-type', '--no-sandbox']
        }

    },
    mochaOpts: {
        reporter: 'spec',
        timeout: 5 * 60 * 1000
    }
};
