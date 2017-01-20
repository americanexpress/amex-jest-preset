describe('jest-preset.json', () => {
  it('should be valid parseable json', () => {
    let isValidJson = true;
    try {
      require('../jest-preset.json');
    } catch (error) {
      isValidJson = false;
    }

    expect(isValidJson).toBe(true);
  });
});
