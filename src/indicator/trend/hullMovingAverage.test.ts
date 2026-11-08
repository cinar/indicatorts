// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { hma } from './hullMovingAverage';

describe('Hull Moving Average (HMA)', () => {
  it('should be able to compute with a config', () => {
    // WMA(2) = [NaN, 5/3, 8/3, 11/3, 14/3], WMA(4) = [NaN, NaN, NaN, 3, 4],
    // 2 * WMA(2) - WMA(4) = [.., .., .., 13/3, 16/3], WMA(2) of that = 5.
    const actual = hma([1, 2, 3, 4, 5], { period: 4 });
    expect(roundDigitsAll(4, actual)).toStrictEqual([NaN, NaN, NaN, NaN, 5]);
  });

  it('should return no values for empty input', () => {
    expect(hma([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/hullMovingAverage.csv'));
    assertColumn(hma(data.close), data.hma);
  });
});
