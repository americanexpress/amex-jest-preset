#!/usr/bin/env node

const fs = require('fs');

const jestPreset = {
  setupTestFrameworkScriptFile: require.resolve('./jest-setup'),
  testResultsProcessor: require.resolve('./html-report-creator'),
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
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
