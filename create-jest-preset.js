#!/usr/bin/env node

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

const jestPreset = {
  setupTestFrameworkScriptFile: require.resolve('./jest-setup'),
  testResultsProcessor: require.resolve('./html-report-creator'),
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!build/**',
    '!dist/**',
    '!lib/**',
    '!test-results/**',
  ],
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
  modulePathIgnorePatterns: [],
};

fs.writeFileSync('jest-preset.json', JSON.stringify(jestPreset, null, 2));
