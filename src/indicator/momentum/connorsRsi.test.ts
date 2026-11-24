// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { crsi } from './connorsRsi';

describe('Connors RSI (CRSI)', () => {
  const config = { rsiPeriod: 1, streakRsiPeriod: 1, percentRankPeriod: 2 };

  it('should average the three components', () => {
    // Closings [1, 2, 4, 4]:
    // RSI(1) = [NaN, 100, 100, 50], streak = [NaN, 1, 2, 0],
    // RSI(1) of the streak = [NaN, NaN, 100, 0],
    // ROC(1) = [NaN, 1, 1, 0], percent rank over 2 prior ROCs = [NaN, NaN, NaN, 0].
    const actual = crsi([1, 2, 4, 4], config);
    expect(actual).toStrictEqual([NaN, NaN, NaN, 50 / 3]);
  });

  it('should count down streaks', () => {
    // Streak = [NaN, -1, -2, 1]; RSI(1) of the streak at index 3 = 100.
    const actual = crsi([4, 3, 2, 3], config);
    // RSI(1) = 100, percent rank of ROC 0.5 over [-0.25, -0.33] = 100.
    expect(actual[3]).toBe(100);
  });

  it('should return no values for empty input', () => {
    expect(crsi([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values match TA-Lib 0.8.3 CRSI(3, 2, 100) and
    // github.com/cinar/indicator (commit 7017344) on the same prices.
    const data = readCsv(join(__dirname, 'testdata/connorsRsi.csv'));
    assertColumn(crsi(data.close), data.crsi);
  });
});
