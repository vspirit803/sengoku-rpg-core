test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});
test('10 % 2 to equal 0', () => {
    expect(10 % 2).toBe(0);
});
test('1 + 0.0001 to greater than 1', () => {
    expect(1 + 0.0001).toBeGreaterThan(1.00009);
});
test('test', () => {
    expect('abc').toBe('abc');
});
