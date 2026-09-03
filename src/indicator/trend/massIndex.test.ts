// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { mi } from './massIndex';

describe('Mass Index (MI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];

  it('should be able to compute with a config', () => {
    const expected = [1, 1.88, 2.78, 3.62, 4.45];

    const actual = mi(highs, lows, {
      emaPeriod: 5,
      miPeriod: 17,
    });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 1.92, 2.83, 3.69, 4.52];

    const actual = mi(highs, lows);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should not propagate NaN when the high-low range EMA is zero', () => {
    // The first bar is flat/halted (high === low), so the single EMA of
    // the range starts at exactly 0, and the double EMA of that starts
    // at exactly 0 too. Without a zero-range guard, ratio[0] would be
    // 0 / 0 = NaN, and because msum is a rolling sum that both adds and
    // later subtracts each value, that single NaN would corrupt every
    // value that follows it, forever.
    const flatFirstHighs = [
      10, 10, 12, 14, 12, 13, 15, 14, 16, 15, 14, 13, 17, 16, 18, 17, 19, 20,
      18, 21, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26,
    ];
    const flatFirstLows = [
      10, 7, 9, 12, 10, 11, 12, 12, 13, 12, 11, 10, 14, 13, 15, 14, 16, 17,
      15, 18, 17, 19, 18, 20, 19, 21, 20, 22, 21, 23,
    ];

    const expected = [
      0, 5, 8.46, 10.98, 13.04, 14.83, 16.57, 18.11, 19.62, 21.07, 22.46,
      23.8, 25.09, 26.33, 27.54, 28.71, 29.86, 30.98, 32.09, 33.17, 34.24,
      35.31, 36.36, 37.4, 38.43, 39.46, 35.49, 33.05, 31.55, 30.5,
    ];

    const actual = mi(flatFirstHighs, flatFirstLows, {
      emaPeriod: 9,
      miPeriod: 25,
    });

    expect(actual.some((value) => Number.isNaN(value))).toBe(false);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
