// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual, throws } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { uo } from './ultimateOscillator';

describe('Ultimate Oscillator (UO)', () => {
  const highs = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const lows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const closings = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  it('should compute ultimate oscillator with default config', () => {
    const actual = uo(highs, lows, closings);
    deepStrictEqual(actual.length, closings.length);
    deepStrictEqual(
      roundDigitsAll(2, actual),
      new Array(closings.length).fill(44.44)
    );
  });

  it('should compute ultimate oscillator with custom config', () => {
    const actual = uo(highs, lows, closings, {
      shortPeriod: 2,
      middlePeriod: 4,
      longPeriod: 6,
    });
    deepStrictEqual(actual.length, closings.length);
    deepStrictEqual(
      roundDigitsAll(2, actual),
      new Array(closings.length).fill(44.44)
    );
  });

  it('should handle empty input arrays', () => {
    const actual = uo([], [], []);
    deepStrictEqual(actual, []);
  });

  it('should throw an error when array lengths differ', () => {
    throws(() => {
      uo([1, 2], [1], [1, 2]);
    });
  });

  it('should handle zero true range without division by zero', () => {
    // Constant prices lead to zero TR
    const flat = [10, 10, 10, 10];
    const actual = uo(flat, flat, flat, {
      shortPeriod: 2,
      middlePeriod: 3,
      longPeriod: 4,
    });
    deepStrictEqual(actual, [0, 0, 0, 0]);
  });
});
