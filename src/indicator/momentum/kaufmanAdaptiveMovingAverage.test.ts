// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { kama } from './kaufmanAdaptiveMovingAverage';

describe('Kaufman Adaptive Moving Average (KAMA)', () => {
  it('should be able to compute with a config', () => {
    const values = [2, 4, 6, 8, 10];
    const expected = [2, 4, 6, 6.888888888888888, 8.271604938271604];

    const actual = kama(values, { period: 3, fast: 2, slow: 30 });

    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const expected = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      10.444444444444445,
      11.135802469135802,
    ];

    const actual = kama(values);

    deepStrictEqual(actual, expected);
  });
});
