// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { ahv } from './annualizedHistoricalVolatility';

describe('Annualized Historical Volatility (AHV)', () => {
  it('should scale by the square root of the trading days', () => {
    const actual = ahv([1, 2, 2, 3], { period: 2, tradingDaysPerYear: 4 });
    expect(actual).toStrictEqual([NaN, NaN, 1, 0.5]);
  });

  it('should return no values for empty input', () => {
    expect(ahv([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(
      join(__dirname, 'testdata/annualizedHistoricalVolatility.csv')
    );
    assertColumn(ahv(data.close), data.ahv, 6);
  });
});
