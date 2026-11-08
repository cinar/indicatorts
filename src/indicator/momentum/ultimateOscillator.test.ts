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

  // Uneven prices, so each window and weight changes the result. The expected
  // values are from TA-Lib ULTOSC, which leaves the first longPeriod values
  // out while it warms up.
  const varHighs = [
    44.64, 44.59, 44.35, 44.21, 44.73, 45.08, 45.45, 45.92, 45.94, 46.53, 46.19,
    46.53, 45.81, 46.88, 46.68, 46.25, 46.38, 46.91, 46.32, 46.09, 46.51, 46.75,
    45.91, 47.05, 46.18, 45.6, 44.38, 44.68, 44.32, 45.02, 43.72, 43.16, 43.33,
  ];
  const varLows = [
    43.94, 43.89, 43.6, 43.31, 44.18, 44.33, 44.85, 45.07, 45.24, 45.88, 45.49,
    45.83, 45.06, 45.98, 46.13, 45.5, 45.78, 46.06, 45.62, 45.44, 45.81, 46.05,
    45.16, 46.15, 45.63, 44.85, 43.78, 43.83, 43.62, 44.37, 43.02, 42.46, 42.58,
  ];
  const varClosings = [
    44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08, 45.89,
    46.03, 45.61, 46.28, 46.28, 46.0, 46.03, 46.41, 46.22, 45.64, 46.21, 46.25,
    45.71, 46.45, 45.78, 45.35, 44.03, 44.18, 44.22, 44.57, 43.42, 42.66, 43.13,
  ];

  it('should match TA-Lib with the default config', () => {
    const actual = uo(varHighs, varLows, varClosings);
    expect(actual.length).toBe(varClosings.length);
    expect(roundDigitsAll(2, actual.slice(28))).toStrictEqual([
      44.6, 43.68, 39.41, 38.89, 39.73,
    ]);
  });

  it('should match TA-Lib with a custom config', () => {
    const actual = uo(varHighs, varLows, varClosings, {
      shortPeriod: 2,
      middlePeriod: 4,
      longPeriod: 6,
    });
    expect(roundDigitsAll(2, actual.slice(6))).toStrictEqual([
      54.7, 47.54, 59.78, 57.21, 49.58, 46.14, 45.89, 52.96, 45.07, 49.99,
      51.88, 44.41, 57.22, 49.3, 49.33, 49.11, 43.56, 52.38, 41.56, 41.22,
      32.49, 28.23, 52.97, 53.03, 36.16, 29.48, 41.86,
    ]);
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
