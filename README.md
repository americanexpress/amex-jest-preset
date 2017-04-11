one-amex-jest-preset
====================

An opinionated [Jest preset](http://facebook.github.io/jest/docs/configuration.html#preset-string)

For a React specific Jest preset use: [amex-jest-preset-react](https://github.com/americanexpress/amex-jest-preset-react)

## Configurations
- [setupTestFrameworkScriptFile](http://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string) is used to load our `jest-setup.js` file from where we tell Jest to output in a junit test result format that Jenkins can use for pretty test result reports. Also adds [one-amex-test-utils](https://github.com/americanexpress/amex-test-utils)

- [collectCoverage](http://facebook.github.io/jest/docs/configuration.html#collectcoverage-boolean) tells Jest to collect code coverage metrics on every test run

- [collectCoverageFrom](http://facebook.github.io/jest/docs/configuration.html#collectcoveragefrom-array) tells Jest what directories to collect and not collect coverage metrics from

- [coverageDirectory](http://facebook.github.io/jest/docs/configuration.html#coveragedirectory-string) tells Jest to output the coverage reports into the `./test-results/coverage` directory
where Jenkins expects it

- [coverageReporters](http://facebook.github.io/jest/docs/configuration.html#coveragereporters-array-string) tells Jest to report coverage as `text` which outputs to your console, `cobertura` format which Jenkins uses, and `lcov` which produces the pretty html you are all used to seeing from Istanbul

- [coverageThreshold](http://facebook.github.io/jest/docs/configuration.html#coveragethreshold-object) tells Jest to return failure unless code coverage is 100% for branch, function, line, and statement. (Yes this does mean that your build will fail if you don't have 100% code coverage)

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

**Note:** You can (but better have a good reason to) override these configurations by [providing your own](http://facebook.github.io/jest/docs/configuration.html) `jest` configuration

## Contributing
We welcome Your interest in the American Express Open Source Community on Github.
Any Contributor to any Open Source Project managed by the American Express Open
Source Community must accept and sign an Agreement indicating agreement to the
terms below. Except for the rights granted in this Agreement to American Express
and to recipients of software distributed by American Express, You reserve all
right, title, and interest, if any, in and to Your Contributions. Please [fill
out the Agreement](http://goo.gl/forms/mIHWH1Dcuy).


## License
Any contributions made under this project will be governed by the [Apache License
2.0](https://github.com/americanexpress/babel-preset-amex/blob/master/LICENSE.txt).

## Code of Conduct
This project adheres to the [American Express Community Guidelines](https://github.com/americanexpress/amex-jest-preset/wiki/Code-of-Conduct).
By participating, you are expected to honor these guidelines.
