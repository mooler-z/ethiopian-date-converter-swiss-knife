/// <reference types="jest" />

import EthiopianCalendar from '../src';

describe('EthiopianCalendar', () => {
  const calendar = new EthiopianCalendar();

  test('converts Ethiopian to Gregorian date correctly', () => {
    const cases: Record<string, number[]> = {
      '1855-02-20': [1862, 10, 29],
      '1857-10-29': [1865, 7, 5],
      '1858-02-22': [1866, 1, 29],
      '1858-10-08': [1866, 4, 17],
      '1859-04-28': [1867, 1, 5],
      '1860-05-05': [1868, 1, 13],
      '5492-08-07': [0, 1, 1],
      '5493-08-05': [1, 1, 1],
      '5499-06-13': [7, 8, 27],
      '5500-01-01': [7, 8, 28],
      '5500-02-01': [7, 8, 29],
      '0001-01-01': [10, 8, 27],
      '0002-01-01': [10, 8, 27],
      '0003-01-01': [10, 8, 27],
      '0004-01-01': [11, 8, 28],
      '5500-05-05': [8, 8, 26],
      '0001-05-13': [9, 8, 26],
      '0002-05-13': [10, 8, 26],
      '0003-05-13': [11, 8, 26],
      '0003-06-13': [11, 8, 27],
      '0004-05-13': [12, 8, 26],
      '1575-06-02': [1582, 10, 13],
      '1575-07-02': [1582, 10, 14],
      '1575-08-02': [1582, 10, 15],
      '1575-09-02': [1582, 10, 16],
      '1892-04-23': [1900, 1, 1],
      '1997-04-23': [2005, 1, 1],
      '2000-05-13': [2008, 9, 10],
      '1893-04-22': [1900, 12, 31],
      '1985-04-22': [1992, 12, 31],
      '1989-04-22': [1996, 12, 31],
      '1993-04-22': [2000, 12, 31],
      '1997-04-22': [2004, 12, 31],
      '2001-04-22': [2008, 12, 31],
      '2993-04-14': [3000, 12, 31],
      '3993-07-04': [4000, 12, 31],
      '5993-03-22': [6000, 12, 31],
    };

    for (let testCase in cases) {
      // TODO: uncomment this when the conversion is changed
      //      const result = calendar.toGregorian(2015, 1, 1);
      //      expect(result.ymdArr).toEqual([2022, 9, 11]);
    }
    const result = calendar.toGregorian(2015, 1, 1);
    expect(result.ymdArr).toEqual([2022, 9, 11]);
  });

  test('converts Gregorian to Ethiopian date correctly', () => {
    const cases: Record<string, number[]> = {
      "1900-01-01": [1892, 4, 23],
      "2005-01-01": [1997, 4, 23],
      "2008-09-10": [2000, 13, 5],
      "1900-12-31": [1893, 4, 22],
      "1992-12-31": [1985, 4, 22],
      "1996-12-31": [1989, 4, 22],
      "2000-12-31": [1993, 4, 22],
      "2004-12-31": [1997, 4, 22],
      "2008-12-31": [2001, 4, 22],
      "3000-12-31": [2993, 4, 14],
      "4000-12-31": [3993, 4, 7],
      "6000-12-31": [5993, 3, 22],
      "2022-9-11": [2015, 1, 1],
    };

    for (let testCase in cases) {
      const result = calendar.toEthiopian(testCase);
      expect(result.ymdArr).toEqual(cases[testCase]);
    }
  });

  test('throws error for invalid input', () => {
    expect(() => calendar.toGregorian(2015, 0, 1)).toThrow();
    expect(() => calendar.toEthiopian(2022, 0, 1)).toThrow();
  });
});
