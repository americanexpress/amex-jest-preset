describe('jest-preset.json', () => {
  it('should be valid parseable json', () => {
    let isValidJson = true;
    try {
      const jestPreset = require('../jest-preset.json');
    } catch (error) {
      isValidJson = false;
    }
    // console.log(jestPreset);
    expect(isValidJson).toBe(true);
  });
});
