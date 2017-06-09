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
