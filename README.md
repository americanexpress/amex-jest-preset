one-amex-jest-preset
========

An opinionated [Jest preset](http://facebook.github.io/jest/docs/configuration.html#preset-string) for ONEAmex modules

Configurations
------------

- [setupTestFrameworkScriptFile](http://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string) is used to load our jest-setup.js file from where we tell Jest to output in a junit test result format that Jenkins can use for pretty test result reports

- [collectCoverage](http://facebook.github.io/jest/docs/configuration.html#collectcoverage-boolean) tells Jest to collect code coverage metrics on every test run

- [collectCoverageFrom](http://facebook.github.io/jest/docs/configuration.html#collectcoveragefrom-array) tells Jest what directories to collect and not collect coverage metrics from

- [coverageDirectory](http://facebook.github.io/jest/docs/configuration.html#coveragedirectory-string) tells Jest to output the coverage reports into the ```./test-results/coverage``` directory
where Jenkins expects it

- [coverageReporters](http://facebook.github.io/jest/docs/configuration.html#coveragereporters-array-string) tells Jest to report coverage as ```text``` which outputs to your console, ```cobertura``` format which Jenkins uses, and ```lcov``` which produces the pretty html you are all used to seeing from Istanbul

- [coverageThreshold](http://facebook.github.io/jest/docs/configuration.html#coveragethreshold-object) tells Jest to return failure unless code coverage is 90% for branch, function, line, and statement. We will be increasing this number as time progresses and teams adapt until it is at 100% (yes this does mean that your build will fail if you don't have 100% code coverage)

- [snapshotSerializers](http://facebook.github.io/jest/docs/configuration.html#snapshotserializers-array-string) tells Jest to use [enzyme-to-json's](https://github.com/adriantoine/enzyme-to-json) serializer

Usage
-----
In your package.json:
```
...
"jest": { "preset": "one-amex-jest-preset" }
...
"devDependencies": {
  ...
  "one-amex-jest-preset": "git+ssh://git@stash.aexp.com/uie/one-amex-jest-preset.git#develop"
  ...
}
...
```
And... that's it! You now have all the boilerplate Jest configurations set up for you! Running ```jest``` from your ```npm test``` script will use all these configurations!

**Note:** You can (but better have a good reason to) override these configurations by [providing your own](http://facebook.github.io/jest/docs/configuration.html) ```jest``` configuration in ```package.json```

If you feel that you have a configuration that is applicable to everyone open up a PR!
