
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

describe('jest-setup', () => {
  const consoleLogSpy = jest.spyOn(console, 'log');
  const consoleWarnSpy = jest.spyOn(console, 'warn');

  beforeEach(() => jest.clearAllMocks());

  it('should extend expect global to add jest-json-schema matcher', () => {
    const schema = {
      properties: {
        hello: { type: 'string' },
      },
      required: ['hello'],
    };
    expect(
      () => expect({ hello: 'world' }).toMatchSchema(schema)
    ).not.toThrow();
  });

  it('should allow extending of $refs in schemas', () => {
    const schema = {
      definitions: {
        ref: { type: 'integer' },
      },
      properties: {
        foo: {
          $ref: '#/definitions/ref',
          minimum: 10,
        },
      },
    };
    expect(
      () => expect({ foo: 10 }).toMatchSchema(schema)
    ).not.toThrow();
    expect(
      () => expect({ foo: 1 }).toMatchSchema(schema)
    ).toThrow();
    // Current version only logs a warning when extending refs without the option,
    // in next major version refs will not be extended by default
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it('should add the expected formats', () => {
    const schema = {
      properties: {
        locale: {
          type: 'string',
          format: 'bcp47',
        },
      },
    };
    expect(
      () => expect({ locale: 'en-US' }).toMatchSchema(schema)
    ).not.toThrow();
    // Current version only logs a warning for unrecognized formats, next major
    // will throw an exception
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
