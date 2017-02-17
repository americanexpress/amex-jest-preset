// thanks to jest
// this is a dev-time file
// ignoring this for istanbul because it is config file that is likely temp and to be replaced with https://www.npmjs.com/package/jest-junit-reporter
/* istanbul ignore next */
const jasmineReporters = require('jasmine-reporters');
/* istanbul ignore next */
const matchers = require('one-amex-test-utils').matchers;

/* istanbul ignore next */
expect.extend(matchers);

/* istanbul ignore next */
jasmine.getEnv().addReporter(
  new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './test-results',
    filePrefix: 'junit',
  })
);
