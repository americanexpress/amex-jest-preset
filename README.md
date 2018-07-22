# amex-jest-preset

An opinionated [Jest preset](http://facebook.github.io/jest/docs/en/configuration.html#preset-string)

For a React specific Jest preset use: [amex-jest-preset-react](https://github.com/americanexpress/amex-jest-preset-react) which extends off of this preset and adds some React specific configurations.

## Configurations

- [cacheDirectory](https://facebook.github.io/jest/docs/en/configuration.html#cachedirectory-string) is used to let Jest know to output its cache within the project workspace (specifically in `<rootDir>/.jest-cache`). This is useful as it eliminates issues caused by several projects sharing the same Jest cache on CI builds.

- [collectCoverage](http://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean) tells Jest to collect code coverage metrics on every test run

- [collectCoverageFrom](http://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array) tells Jest what directories to collect and not collect coverage metrics from

- [coverageDirectory](http://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string) tells Jest to output the coverage reports into the `./test-results/coverage` directory

- [coverageReporters](http://facebook.github.io/jest/docs/en/configuration.html#coveragereporters-array-string) tells Jest to report coverage as `text` which outputs to your console, `cobertura` format which Jenkins uses, and `lcov` which produces the pretty HTML you are all used to seeing from Istanbul

- [coverageThreshold](http://facebook.github.io/jest/docs/en/configuration.html#coveragethreshold-object) tells Jest to return failure unless code coverage is 100% for branch, function, line, and statement. (Yes this does mean that your build will fail if you don't have 100% code coverage)

- [modulePathIgnorePatterns](https://facebook.github.io/jest/docs/en/configuration.html#modulepathignorepatterns-array-string) tells Jest to not even consider `npm-cache` and `npm` directories for module loading. This prevents issues on CI server where `npm-cache` may be shared across build workspaces.

- [setupTestFrameworkScriptFile](http://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string) is where we load [jest-json-schema](https://github.com/americanexpress/jest-json-schema) so you have access to it throughout your tests.

- [testEnvironment](https://jestjs.io/docs/en/configuration.html#testenvironment-string) tells Jest to use `node` as its test environment. This is done for performance reasons as the full `jsdom` environment is not needed for most tests and including it slows Jest startup time considerably.

- [testResultsProcessor](http://facebook.github.io/jest/docs/en/configuration.html#testresultsprocessor-string) is used to output test results onto our HTML report creator. That way pretty HTML test results are created in `<rootDir>/test-results/`


## Usage

1. Install:
```bash
npm install --save-dev amex-jest-preset
```

2. And in your [Jest configuration][]:
```json
{
  "preset": "amex-jest-preset"
}
```
And... that's it! You now have all the boilerplate Jest configurations set up for you! Running `jest` from your `npm test` script will use all these configurations!

### Extending the preset provided configuration

You can add on and/or override any values provided in this preset as you wish in your [Jest configuration][].

It should be noted that if overriding the `setupTestFrameworkScriptFile` you may want to extend off of the [setup file provided by amex-jest-preset](./jest-setup.js) in order to preserve that files' content. Otherwise you will lose anything we provide for you in [there](./jest-setup.js). Do so as follows:

```javascript
// in custom-jest-setup.js
require('amex-jest-preset/jest-setup');

// your own custom setup
```

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
2.0](./LICENSE.txt).

## Code of Conduct
This project adheres to the [American Express Community Guidelines](./CODE_OF_CONDUCT.md).
By participating, you are expected to honor these guidelines.

[Jest configuration]: http://facebook.github.io/jest/docs/en/configuration.html