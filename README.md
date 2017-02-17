one-amex-jest-preset
====================

An opinionated [Jest preset](http://facebook.github.io/jest/docs/configuration.html#preset-string) for One Amex modules.

For a React specific Jest preset use: [one-amex-jest-preset-react](https://stash.aexp.com/stash/projects/UIE/repos/one-amex-jest-preset-react/browse)

Configurations
------------

- [setupTestFrameworkScriptFile](http://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string) is used to load our `jest-setup.js` file from where we tell Jest to output in a junit test result format that Jenkins can use for pretty test result reports and to add [one-amex-test-utils](https://stash.aexp.com/stash/projects/UIE/repos/one-amex-test-utils/browse)

- [collectCoverage](http://facebook.github.io/jest/docs/configuration.html#collectcoverage-boolean) tells Jest to collect code coverage metrics on every test run

- [collectCoverageFrom](http://facebook.github.io/jest/docs/configuration.html#collectcoveragefrom-array) tells Jest what directories to collect and not collect coverage metrics from

- [coverageDirectory](http://facebook.github.io/jest/docs/configuration.html#coveragedirectory-string) tells Jest to output the coverage reports into the `./test-results/coverage` directory
where Jenkins expects it

- [coverageReporters](http://facebook.github.io/jest/docs/configuration.html#coveragereporters-array-string) tells Jest to report coverage as `text` which outputs to your console, `cobertura` format which Jenkins uses, and `lcov` which produces the pretty html you are all used to seeing from Istanbul

- [coverageThreshold](http://facebook.github.io/jest/docs/configuration.html#coveragethreshold-object) tells Jest to return failure unless code coverage is 100% for branch, function, line, and statement. (Yes this does mean that your build will fail if you don't have 100% code coverage)

Usage
-----

Install with npm by running `npm install --save-dev one-amex-jest-preset`

And in your package.json:
```
...
"jest": {
  "preset": "one-amex-jest-preset"
}
...
```
And... that's it! You now have all the boilerplate Jest configurations set up for you! Running `jest` from your `npm test` script will use all these configurations!

**Note:** You can (but better have a good reason to) override these configurations by [providing your own](http://facebook.github.io/jest/docs/configuration.html) `jest` configuration in `package.json`

If you feel that you have a configuration that is applicable to everyone [fork](https://stash.aexp.com/stash/projects/UIE/repos/one-amex-jest-preset?fork) and [open a PR](https://stash.aexp.com/stash/projects/UIE/repos/one-amex-jest-preset/pull-requests?create)!
