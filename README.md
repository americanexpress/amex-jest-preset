amex-jest-preset
====================

An opinionated [Jest preset](http://facebook.github.io/jest/docs/en/configuration.html#preset-string)

For a React specific Jest preset use: [amex-jest-preset-react](https://github.com/americanexpress/amex-jest-preset-react) which extends off of this preset and adds some React specific configurations.

## Configurations
- [setupTestFrameworkScriptFile](http://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string) is where we load [jest-json-schema](https://github.com/americanexpress/jest-json-schema) so you have access to it throughout your tests.

- [testResultsProcessor](http://facebook.github.io/jest/docs/en/configuration.html#testresultsprocessor-string) is used to output test results onto our html report creator. That way pretty html test results are created in `<rootDir>/test-results/`

- [collectCoverage](http://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean) tells Jest to collect code coverage metrics on every test run

- [collectCoverageFrom](http://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array) tells Jest what directories to collect and not collect coverage metrics from

- [coverageDirectory](http://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string) tells Jest to output the coverage reports into the `./test-results/coverage` directory

- [coverageReporters](http://facebook.github.io/jest/docs/en/configuration.html#coveragereporters-array-string) tells Jest to report coverage as `text` which outputs to your console, `cobertura` format which Jenkins uses, and `lcov` which produces the pretty html you are all used to seeing from Istanbul

- [coverageThreshold](http://facebook.github.io/jest/docs/en/configuration.html#coveragethreshold-object) tells Jest to return failure unless code coverage is 100% for branch, function, line, and statement. (Yes this does mean that your build will fail if you don't have 100% code coverage)

## Usage

1. Install:
```bash
npm install --save-dev amex-jest-preset
```

2. And in your package.json:
```json
...
"jest": {
    "preset": "amex-jest-preset"
}
...
```
And... that's it! You now have all the boilerplate Jest configurations set up for you! Running `jest` from your `npm test` script will use all these configurations!

**Note:** You can override these configurations by [providing your own](http://facebook.github.io/jest/docs/en/configuration.html) `jest` configuration

## Contributing
We welcome Your interest in the American Express Open Source Community on Github.
Any Contributor to any Open Source Project managed by the American Express Open
Source Community must accept and sign an Agreement indicating agreement to the
terms below. Except for the rights granted in this Agreement to American Express
and to recipients of software distributed by American Express, You reserve all
right, title, and interest, if any, in and to Your Contributions. Please [fill
out the Agreement](https://cla-assistant.io/americanexpress/).


## License
Any contributions made under this project will be governed by the [Apache License
2.0](https://github.com/americanexpress/amex-jest-preset/blob/master/LICENSE.txt).

## Code of Conduct
This project adheres to the [American Express Community Guidelines](https://github.com/americanexpress/amex-jest-preset/wiki/Code-of-Conduct).
By participating, you are expected to honor these guidelines.
