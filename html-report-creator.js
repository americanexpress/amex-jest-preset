/*
 * Copyright (c) 2017 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

// based on https://github.com/Hargne/jest-html-reporter but with prettier styling and jest-image-snapshot specific logic
const path = require('path');
const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const mkdirp = require('mkdirp');
const stripAnsi = require('strip-ansi');

const style = require('./html-report-style');

const writeFile = (filePath, content) => {
  mkdirp.sync(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
};

const createHtml = () => xmlbuilder.create({
  html: {
    head: {
      meta: { '@charset': 'utf-8' },
      title: { '#text': 'Jest test results' },
      style: { '@type': 'text/css', '#text': style },
    },
  },
});

module.exports = (result) => {
  const htmlOutput = createHtml();
  const summary = htmlOutput.ele('div', { class: 'summary' });
  summary.ele('div', `
    Test Suites: ${result.numPassedTestSuites} passed,
    ${result.numFailedTestSuites} failed,
    ${result.numPendingTestSuites} skipped,
    ${result.numTotalTestSuites} total
  `);

  summary.ele('div', `
    Tests: ${result.numPassedTests} passed,
    ${result.numFailedTests} failed,
    ${result.numPendingTests} skipped,
    ${result.numTotalTests} total
  `);

  result.testResults.forEach((suite) => {
    htmlOutput.ele('div', { class: 'suite-info' }, `
      ${suite.testFilePath}
      (${(suite.perfStats.end - suite.perfStats.start) / 1000}s)
    `);

    const suiteTable = htmlOutput.ele('table', { class: 'suite-table' });

    if (suite.testExecError) {
      const testTr = suiteTable.ele('tr', { class: 'failed' });
      const testExecFailureCell = testTr.ele('td');
      testExecFailureCell.ele('div', 'Test suite failed to run:');
      testExecFailureCell.ele('pre', `${suite.testExecError.message}\n${suite.testExecError.stack}`);
    } else {
      suite.testResults.forEach((test) => {
        if (test.status !== 'pending') {
          const testTr = suiteTable.ele('tr', { class: test.status });
          const statusIcon = test.status === 'passed' ? '✔' : '✘';
          const testTd = testTr.ele('td', `${statusIcon} ${test.fullName}`);
          testTd.ele('span', { class: 'result' }, `${test.status} in ${test.duration / 1000}s`);

          if (test.failureMessages.length > 0) {
            const failureMsgDiv = testTd.ele('div');
            test.failureMessages.forEach((failureMsg) => {
              const plainFailureMessage = stripAnsi(failureMsg);
              if (plainFailureMessage) {
                // TODO: need to find better way to when it is an image snapshot
                if (plainFailureMessage.includes('__image_snapshots__/')) {
                  const imageDiffUrl = `${plainFailureMessage.match(':(.*).png')[1]}.png`;
                  failureMsgDiv.ele('a', { href: imageDiffUrl });
                }
                failureMsgDiv.ele('pre', plainFailureMessage);
              }
            });
          }
        }
      });
    }
  });
  writeFile(
    process.env.JEST_TEST_REPORT_PATH || path.join(process.cwd(), 'test-results/test-report.html'),
    htmlOutput.end({
      pretty: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: false,
    })
  );

  return result;
};
