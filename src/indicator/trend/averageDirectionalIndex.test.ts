// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { deepStrictEqual, throws } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { adx } from './averageDirectionalIndex';

describe('Average Directional Index (ADX)', () => {
  const highs = [10, 11, 12, 11.5, 13, 14, 13.5, 15, 14.5, 16];
  const lows = [9, 9.5, 10.5, 10, 11, 12.5, 12, 13, 13, 14.5];
  const closings = [9.5, 10.5, 11.5, 10.5, 12.5, 13.5, 12.5, 14.5, 13.5, 15.5];

  it('should be able to compute with a config', () => {
    // Expected values from TA-Lib 0.8.3 PLUS_DI, MINUS_DI and ADX with a
    // period of 3.
    const expectedPlusDi = [
      NaN,
      NaN,
      NaN,
      38.1,
      49.43,
      54.9,
      37.18,
      47.37,
      33.79,
      44.73,
    ];
    const expectedMinusDi = [
      NaN,
      NaN,
      NaN,
      14.29,
      6.9,
      4.71,
      13.94,
      7.72,
      5.51,
      3.21,
    ];
    const expectedAdx = [
      NaN,
      NaN,
      NaN,
      NaN,
      NaN,
      68.39,
      60.75,
      64.49,
      66.99,
      73.53,
    ];

    const actual = adx(highs, lows, closings, { period: 3 });
    deepStrictEqual(roundDigitsAll(2, actual.plusDi), expectedPlusDi);
    deepStrictEqual(roundDigitsAll(2, actual.minusDi), expectedMinusDi);
    deepStrictEqual(roundDigitsAll(2, actual.adx), expectedAdx);
  });

  it('should be able to compute without a config', () => {
    const actual = adx(highs, lows, closings);
    const expected = new Array<number>(highs.length).fill(NaN);

    // The default period of 14 needs more values than given.
    deepStrictEqual(actual.plusDi, expected);
    deepStrictEqual(actual.minusDi, expected);
    deepStrictEqual(actual.adx, expected);
  });

  it('should treat a flat market as no directional movement', () => {
    const flatHighs = [10, 10, 10, 10, 10, 10, 11, 12];
    const flatLows = [10, 10, 10, 10, 10, 10, 10.5, 11];
    const flatClosings = [10, 10, 10, 10, 10, 10, 11, 12];

    // TA-Lib 0.8.3 gives the same values for these bars.
    const actual = adx(flatHighs, flatLows, flatClosings, { period: 3 });
    deepStrictEqual(roundDigitsAll(2, actual.plusDi), [
      NaN,
      NaN,
      NaN,
      0,
      0,
      0,
      100,
      100,
    ]);
    deepStrictEqual(roundDigitsAll(2, actual.minusDi), [
      NaN,
      NaN,
      NaN,
      0,
      0,
      0,
      0,
      0,
    ]);
    deepStrictEqual(roundDigitsAll(2, actual.adx), [
      NaN,
      NaN,
      NaN,
      NaN,
      NaN,
      0,
      33.33,
      55.56,
    ]);
  });

  it('should count no movement when the up and down moves are equal', () => {
    // The second bar extends the range by 1 in both directions, so neither
    // direction counts. TA-Lib 0.8.3 gives the same values for these bars.
    const actual = adx(
      [10, 11, 11.5, 12],
      [9, 8, 8.5, 9],
      [9.5, 10, 11, 11.5],
      { period: 2 }
    );
    deepStrictEqual(roundDigitsAll(2, actual.plusDi), [NaN, NaN, 11.11, 14.29]);
    deepStrictEqual(roundDigitsAll(2, actual.minusDi), [NaN, NaN, 0, 0]);
    deepStrictEqual(roundDigitsAll(2, actual.adx), [NaN, NaN, NaN, 100]);
  });

  it('should return no values for empty input', () => {
    expect(adx([], [], [])).toStrictEqual({ plusDi: [], minusDi: [], adx: [] });
  });

  it('should throw when the lengths differ', () => {
    throws(() => adx([1, 2], [1], [1, 2]));
  });

  it('should match the reference data', () => {
    // Expected values from TA-Lib 0.8.3 PLUS_DI, MINUS_DI and ADX with the
    // default period of 14, run on the same prices.
    const data = readCsv(
      join(__dirname, 'testdata/averageDirectionalIndex.csv')
    );
    const actual = adx(data.high, data.low, data.close);
    assertColumn(actual.plusDi, data.plusDi);
    assertColumn(actual.minusDi, data.minusDi);
    assertColumn(actual.adx, data.adx);
  });
});
