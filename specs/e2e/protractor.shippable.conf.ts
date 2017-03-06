import { config } from './protractor.conf';

config.mochaOpts.reporter = 'mocha-junit-reporter';
(config.mochaOpts as any).reporterOptions = {
    mochaFile: './shippable/testresults/e2e.xml'
};

export { config }
