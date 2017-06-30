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

const merge = require('lodash/merge');
const mkdirp = require('mkdirp');
const fs = require('fs');

function prettyPrintHtml(rawHtml) {
  return rawHtml.end({
    pretty: true,
    indent: '  ',
    newline: '\n',
    allowEmpty: false,
  });
}

function buildMockResult(mockResult = {}) {
  const defaultMockResult = {
    numFailedTestSuites: 0,
    numFailedTests: 0,
    numPassedTestSuites: 1,
    numPassedTests: 1,
    numPendingTestSuites: 0,
    numPendingTests: 0,
    numRuntimeErrorTestSuites: 0,
    numTotalTestSuites: 1,
    numTotalTests: 1,
    startTime: 1497400767268,
    success: true,
    testResults: [
      { console: [],
        perfStats: {
          end: 1497401364334,
          start: 1497401364037,
        },
        testFilePath: '/path/to/__tests__/test.spec.js',
        testResults: [
          {
            failureMessages: [],
            duration: 4,
            fullName: 'test should work',
            status: 'passed',
          },
        ],
      },
    ],
  };

  return merge({}, defaultMockResult, mockResult);
}

function setupTest() {
  jest.doMock('mkdirp', () => ({ sync: jest.fn() }));
  fs.writeFileSync = jest.fn();
  process.cwd = jest.fn(() => '/path/to/something');

  return require('../html-report-creator');
}

describe('html-report-creator', () => {
  const originalFsWriteFileSync = fs.writeFileSync;
  const originalCwd = process.cwd();
  const originalMkdirpSync = mkdirp.sync;
  const originalJestTestReportPath = process.env.JEST_TEST_REPORT_PATH;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    process.env.JEST_TEST_REPORT_PATH = 'path/to/something/test-report.html';
  });

  it('should render correctly if there are test execution errors in a suite', () => {
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult(
      {
        testResults: [
          { testExecError: {
            message: 'error!',
            stack: 'stacktrace for error',
          },
          },
        ],
      }
    );

    createHtmlReport(mockResult);
    expect(
      prettyPrintHtml(fs.writeFileSync.mock.calls[0][1])
    ).toMatchSnapshot();
  });

  it('should not display pending tests', () => {
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult(
      {
        numPassedTestSuites: 0,
        numPendingTestSuites: 1,
        numPassedTests: 0,
        numPendingTests: 1,
        testResults: [
          {
            testResults: [{ status: 'pending' }],
          },
        ],
      }
    );

    createHtmlReport(mockResult);
    expect(
      prettyPrintHtml(fs.writeFileSync.mock.calls[0][1])
    ).toMatchSnapshot();
  });

  it('should correctly render passing tests', () => {
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult();

    createHtmlReport(mockResult);
    expect(
      prettyPrintHtml(fs.writeFileSync.mock.calls[0][1])
    ).toMatchSnapshot();
  });

  it('should correctly render failing tests', () => {
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult(
      {
        numPassedTestSuites: 0,
        numFailedTestSuites: 1,
        numPassedTests: 0,
        numFailedTests: 1,
        testResults: [
          {
            testResults: [{ status: 'failed', failureMessages: ['This test failed yo!'] }],
          },
        ],
      }
    );

    createHtmlReport(mockResult);
    expect(
      prettyPrintHtml(fs.writeFileSync.mock.calls[0][1])
    ).toMatchSnapshot();
  });

  it('should render failure message as a link if test is for an image snapshot', () => {
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult(
      {
        numPassedTestSuites: 0,
        numFailedTestSuites: 1,
        numPassedTests: 0,
        numFailedTests: 1,
        testResults: [
          {
            testResults: [{ status: 'failed', failureMessages: ['Image snapshot failed.\nSee diff for details: /path/to/__image_snapshots__/__diff_output__/test-diff.png'] }],
          },
        ],
      }
    );

    createHtmlReport(mockResult);
    expect(
      prettyPrintHtml(fs.writeFileSync.mock.calls[0][1])
    ).toMatchSnapshot();
  });

  it('should write output to default path if JEST_TEST_REPORT_PATH does not exist', () => {
    delete process.env.JEST_TEST_REPORT_PATH;
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult();

    createHtmlReport(mockResult);
    expect(fs.writeFileSync.mock.calls[0][0]).toBe('/path/to/something/test-results/test-report.html');
  });

  it('should write output to JEST_TEST_REPORT_PATH if variable exists', () => {
    const customTestReportPath = 'custom/path/to/test-report.html';
    process.env.JEST_TEST_REPORT_PATH = customTestReportPath;
    const createHtmlReport = setupTest();
    const mockResult = buildMockResult();

    createHtmlReport(mockResult);
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(customTestReportPath);
  });

  afterAll(() => {
    fs.writeFileSync = originalFsWriteFileSync;
    process.cwd = originalCwd;
    mkdirp.sync = originalMkdirpSync;
    if (originalJestTestReportPath) {
      process.env.JEST_TEST_REPORT_PATH = originalJestTestReportPath;
    } else {
      delete process.env.JEST_TEST_REPORT_PATH;
    }
  });
});
