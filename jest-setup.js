// thanks to jest
// this is a dev-time file
// ignoring this for istanbul because it is config file that is likely temp and to be replaced with https://www.npmjs.com/package/jest-junit-reporter
const jasmineReporters = require('jasmine-reporters');
const matchersWithFormats = require('jest-json-schema').matchersWithFormats;

const formats = {
  bcp47: /^[a-z]{2}-[A-Z]{2}$/,
}

expect.extend(matchersWithFormats(formats));

jasmine.getEnv().addReporter(
  new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './test-results',
    filePrefix: 'junit',
  })
);
