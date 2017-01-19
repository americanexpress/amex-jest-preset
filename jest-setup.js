// thanks to jest
// this is a dev-time file
const jasmineReporters = require('jasmine-reporters');

jasmine.getEnv().addReporter(
  new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './test-results',
    filePrefix: 'junit',
  })
);
