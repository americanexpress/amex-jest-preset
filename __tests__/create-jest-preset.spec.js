
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
const fs = require('fs');

describe('jest-preset.json', () => {
  let originalFsWriteFileSync;

  beforeAll(() => {
    originalFsWriteFileSync = fs.writeFileSync;
    fs.writeFileSync = jest.fn();
  });

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should produce valid parseable json', () => {
    require('../create-jest-preset');

    expect(JSON.parse(fs.writeFileSync.mock.calls[0][1])).toMatchObject({
      cache: expect.any(Boolean),
      setupTestFrameworkScriptFile: expect.any(String),
      testResultsProcessor: expect.any(String),
      collectCoverage: true,
      collectCoverageFrom: [
        '**/*.js',
        '!**/node_modules/**',
        '!build/**',
        '!dist/**',
        '!lib/**',
        '!test-results/**',
      ],
      testEnvironment: 'node',
      coverageDirectory: '<rootDir>/test-results/coverage',
      coverageReporters: [
        'text',
        'lcov',
        'cobertura',
      ],
      coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
    });
  });

  it('should disable jest cache if running on CI server', () => {
    jest.doMock('is-ci', () => true);
    require('../create-jest-preset');

    expect(JSON.parse(fs.writeFileSync.mock.calls[0][1])).toHaveProperty('cache', false);
  });

  it('should enable jest cache if running outside of a CI server', () => {
    jest.doMock('is-ci', () => false);
    require('../create-jest-preset');

    expect(JSON.parse(fs.writeFileSync.mock.calls[0][1])).toHaveProperty('cache', true);
  });

  afterAll(() => {
    fs.writeFileSync = originalFsWriteFileSync;
  });
});
