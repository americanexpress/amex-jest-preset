const styles = require('../html-report-style');

describe('html-report-creator', () => {
  it('should export styles', () => {
    expect(styles()).toMatchSnapshot();
  });
});
