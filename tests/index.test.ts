/// <reference types="jest" />

import EthiopianCalendar from '../src';

describe('EthiopianCalendar', () => {
  const calendar = new EthiopianCalendar();

  test('converts Ethiopian to Gregorian date correctly', () => {
    const result = calendar.toGregorian(2015, 1, 1);
    expect(result.ymdArr).toEqual([2022, 9, 11]);
  });

  test('converts Gregorian to Ethiopian date correctly', () => {
    const result = calendar.toEthiopian(2022, 9, 11);
    expect(result.ymdArr).toEqual([2015, 1, 1]);
  });

  test('throws error for invalid input', () => {
    expect(() => calendar.toGregorian(2015, 0, 1)).toThrow();
    expect(() => calendar.toEthiopian(2022, 0, 1)).toThrow();
  });
}); 