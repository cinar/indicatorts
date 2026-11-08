// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { deepStrictEqual } from 'assert';
import {
  kama,
  kaufmanAdaptiveMovingAverage,
} from './kaufmanAdaptiveMovingAverage';

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
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10.444444444444445, 11.135802469135802,
    ];

    const actual = kama(values);

    deepStrictEqual(actual, expected);
  });

  it('should return an empty array for empty values', () => {
    deepStrictEqual(kama([]), []);
  });

  it('should use the slow smoothing constant when the window is flat', () => {
    // With period 2, the window ending at the last bar has no price
    // movement, so the efficiency ratio is 0 instead of NaN (0 / 0), and
    // KAMA keeps catching up to the price at the slowest rate.
    const fastSC = 2 / (2 + 1);
    const slowSC = 2 / (30 + 1);
    const k2 = 0 + Math.pow(fastSC, 2) * (10 - 0);
    const k3 = k2 + Math.pow(fastSC, 2) * (10 - k2);
    const k4 = k3 + Math.pow(slowSC, 2) * (10 - k3);

    const actual = kama([0, 0, 10, 10, 10], { period: 2 });
    const expected = [0, 0, k2, k3, k4];

    expect(actual).toHaveLength(expected.length);
    expected.forEach((value, i) => {
      expect(actual[i]).toBeCloseTo(value, 12);
    });
  });

  it('should be exported under its full name', () => {
    expect(kaufmanAdaptiveMovingAverage).toBe(kama);
  });

  it('should match the reference data', () => {
    const data = readCsv(
      join(__dirname, 'testdata/kaufmanAdaptiveMovingAverage.csv')
    );
    assertColumn(kama(data.close), data.kama);
  });
});
