// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { stc } from './schaffTrendCycle';

describe('Schaff Trend Cycle (STC)', () => {
  it('should leave the warm-up period NaN', () => {
    const closings = Array.from({ length: 12 }, (_, i) => 10 + (i % 3));
    const actual = stc(closings, { fast: 2, slow: 3, kPeriod: 3, dPeriod: 2 });
    // max(fast, slow) - 1 + 2 * (kPeriod - 1) = 6
    expect(actual.findIndex(Number.isFinite)).toBe(6);
  });

  it('should use the larger EMA period for warm-up when fast exceeds slow', () => {
    const closings = Array.from({ length: 16 }, (_, i) => 10 + (i % 3));
    const actual = stc(closings, { fast: 10, slow: 3, kPeriod: 3, dPeriod: 2 });
    // max(10, 3) - 1 + 2 * (3 - 1) = 13
    expect(actual.findIndex(Number.isFinite)).toBe(13);
  });

  it('should carry forward the previous smoothed value on flat windows', () => {
    const closings = new Array<number>(12).fill(10);
    const actual = stc(closings, { fast: 2, slow: 3, kPeriod: 3, dPeriod: 2 });
    expect(actual.slice(0, 6)).toStrictEqual([NaN, NaN, NaN, NaN, NaN, NaN]);
    expect(actual.slice(6)).toStrictEqual([0, 0, 0, 0, 0, 0]);
  });

  it('should return no values for empty input', () => {
    expect(stc([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values match TA-Lib 0.8.3 STC(23, 50, 10) and
    // github.com/cinar/indicator (commit 7017344) on the same prices.
    const data = readCsv(join(__dirname, 'testdata/schaffTrendCycle.csv'));
    assertColumn(stc(data.close), data.stc);
  });
});
