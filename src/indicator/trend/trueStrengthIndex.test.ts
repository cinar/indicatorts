// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { tsi } from './trueStrengthIndex';

describe('True Strength Index (TSI)', () => {
  it('should be 100 for a steady rise', () => {
    const actual = tsi([1, 2, 3, 4], { firstPeriod: 2, secondPeriod: 2 });
    expect(actual).toStrictEqual([NaN, NaN, NaN, 100]);
  });

  it('should be 0 when the price does not change', () => {
    const actual = tsi([5, 5, 5, 5], { firstPeriod: 2, secondPeriod: 2 });
    expect(actual).toStrictEqual([NaN, NaN, NaN, 0]);
  });

  it('should return no values for empty input', () => {
    expect(tsi([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/trueStrengthIndex.csv'));
    assertColumn(tsi(data.close), data.tsi);
  });
});
