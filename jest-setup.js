// thanks to jest
// this is a dev-time file
// ignoring this for istanbul because it is config file that is likely temp and to be replaced with https://www.npmjs.com/package/jest-junit-reporter
const jasmineReporters = require('jasmine-reporters');
const matchers = require('jest-json-schema').matchers;

expect.extend(matchers);

jasmine.getEnv().addReporter(
  new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './test-results',
    filePrefix: 'junit',
  })
);
