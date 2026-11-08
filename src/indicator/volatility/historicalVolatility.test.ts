// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { hv } from './historicalVolatility';

describe('Historical Volatility (HV)', () => {
  it('should be the standard deviation of the returns', () => {
    // Returns [NaN, 1, 0, 0.5], population std of [0, 0.5] = 0.25.
    expect(hv([1, 2, 2, 3], { period: 2 })).toStrictEqual([
      NaN,
      NaN,
      0.5,
      0.25,
    ]);
  });

  it('should return no values for empty input', () => {
    expect(hv([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/historicalVolatility.csv'));
    assertColumn(hv(data.close), data.hv, 6);
  });
});
