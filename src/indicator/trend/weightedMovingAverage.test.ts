// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { wma } from './weightedMovingAverage';

describe('Weighted Moving Average (WMA)', () => {
  it('should give the newest value the highest weight', () => {
    // (1 * 1 + 2 * 2 + 3 * 3) / 6
    expect(wma([1, 2, 3], { period: 3 })).toStrictEqual([NaN, NaN, 14 / 6]);
  });

  it('should return no values for empty input', () => {
    expect(wma([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    // TA-Lib 0.8.3 WMA(20) gives the same values.
    const data = readCsv(join(__dirname, 'testdata/weightedMovingAverage.csv'));
    assertColumn(wma(data.close), data.wma);
  });
});
