// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { superTrend } from './superTrend';

describe('Super Trend', () => {
  // With period 1, the ATR is the true range itself.
  const config = { period: 1, multiplier: 1 };

  it('should switch bands when the close crosses them', () => {
    const highs = [11, 11, 11, 11, 30, 31];
    const lows = [9, 9, 9, 9, 28, 29];
    const closings = [10, 10, 5, 10, 29, 30];
    const actual = superTrend(highs, lows, closings, config);
    // Bar 1: bands 12 and 8. Bar 2 closes at 5, below the lower band, so the
    // result switches to the upper band. Bar 4 closes above it at 29 and
    // switches back to the lower band.
    expect(actual).toStrictEqual([NaN, 8, 12, 12, 9, 28]);
  });

  it('should return NaN when there is no full window', () => {
    expect(superTrend([1], [1], [1])).toStrictEqual([NaN]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => superTrend([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/superTrend.csv'));
    assertColumn(superTrend(data.high, data.low, data.close), data.superTrend);
  });
});
