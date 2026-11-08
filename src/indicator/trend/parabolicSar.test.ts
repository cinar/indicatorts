// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { Trend } from '../types';
import { psar } from './parabolicSar';

describe('Parabolic SAR (SAR)', () => {
  const highs = [
    3836.86, 3766.57, 3576.17, 3513.55, 3529.75, 3756.17, 3717.17, 3572.62,
    3612.43,
  ];

  const lows = [
    3643.25, 3542.73, 3371.75, 3334.02, 3314.75, 3558.21, 3517.79, 3447.9,
    3494.39,
  ];

  const closings = [
    3790.55, 3546.2, 3507.31, 3340.81, 3529.6, 3717.41, 3544.35, 3478.14,
    3612.08,
  ];

  it('should be able to compute with a config', () => {
    const expectedPsar = [
      3836.86, 3836.86, 3836.86, 3822.91, 3803.35, 3778.92, 3756.17, 3756.17,
      3734.1,
    ];
    const expectedTrends = [
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
    ];

    const actual = psar(highs, lows, closings, {
      step: 0.01,
      max: 0.3,
    });
    deepStrictEqual(roundDigitsAll(2, actual.psarResult), expectedPsar);
    deepStrictEqual(actual.trends, expectedTrends);
  });

  it('should be able to compute without a config', () => {
    const expectedPsar = [
      3836.86, 3836.86, 3836.86, 3808.95, 3770.96, 3314.75, 3314.75, 3323.58,
      3332.23,
    ];
    const expectedTrends = [
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.RISING,
      Trend.RISING,
      Trend.RISING,
      Trend.RISING,
    ];

    const actual = psar(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual.psarResult), expectedPsar);
    deepStrictEqual(actual.trends, expectedTrends);
  });

  it('should reverse on penetration even when the closing equals the EP', () => {
    // Bar 3's low penetrates the rising SAR while its closing equals the
    // prior EP (13), so the SAR becomes 13 and the trend must reverse.
    const actual = psar(
      [10, 12, 13, 13],
      [9, 10, 11.5, 8],
      [9.5, 11.5, 12.5, 13]
    );

    deepStrictEqual(roundDigitsAll(2, actual.psarResult), [10, 9, 9, 13]);
    deepStrictEqual(actual.trends, [
      Trend.FALLING,
      Trend.RISING,
      Trend.RISING,
      Trend.FALLING,
    ]);
  });

  it('should not let the acceleration factor exceed the max', () => {
    // A steady uptrend makes a new high on every bar, so AF grows by 0.02
    // per bar until it is capped at 0.2. Once capped, each SAR closes 20%
    // of the gap to the EP (the previous bar's high).
    const upHighs = Array.from({ length: 20 }, (_, i) => 10 + i);
    const upLows = upHighs.map((high) => high - 1);

    const actual = psar(upHighs, upLows, upLows);
    for (let i = 15; i < upHighs.length; i++) {
      const prev = actual.psarResult[i - 1];
      const acceleration =
        (actual.psarResult[i] - prev) / (upHighs[i - 1] - prev);
      expect(acceleration).toBeCloseTo(0.2, 10);
    }
  });

  it('should return no values for empty input', () => {
    expect(psar([], [], [])).toStrictEqual({ trends: [], psarResult: [] });
  });
});
