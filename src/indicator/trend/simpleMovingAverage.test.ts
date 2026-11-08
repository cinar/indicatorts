// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { sma } from './simpleMovingAverage';

describe('Simple Moving Average (SMA)', () => {
  const values = [2, 4, 6, 8, 10];

  it('should be able to compute with a config', () => {
    const expected = [2, 3, 4, 5, 7];

    const actual = sma(values, { period: 4 });

    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [2, 3, 5, 7, 9];

    const actual = sma(values);

    deepStrictEqual(actual, expected);
  });

  it('should average a window of zeros to exactly 0', () => {
    const actual = sma([0.1, 0.2, 0.3, 0.7, 0, 0, 0, 0], { period: 4 });
    deepStrictEqual(actual.slice(7), [0]);
  });

  it('should recover after a NaN leaves the window', () => {
    const actual = sma([2, NaN, 4, 6, 8], { period: 2 });
    deepStrictEqual(actual, [2, NaN, NaN, 5, 7]);
  });
});
