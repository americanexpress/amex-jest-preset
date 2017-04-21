describe('jest-setup', () => {
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
});
