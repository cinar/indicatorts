// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { chop } from './choppinessIndex';

describe('Choppiness Index (CHOP)', () => {
  it('should compare the true ranges with the total range', () => {
    // Two overlapping bars: TR = [NaN, 2, 2], range of the last 2 bars = 2,
    // so CHOP = 100 * log10(4 / 2) / log10(2) = 100.
    const actual = chop([3, 3, 3], [1, 1, 1], [2, 2, 2], { period: 2 });
    expect(actual).toStrictEqual([NaN, NaN, 100]);
  });

  it('should be 0 for a window without a range', () => {
    const actual = chop([2, 2, 2], [2, 2, 2], [2, 2, 2], { period: 2 });
    expect(actual).toStrictEqual([NaN, NaN, 0]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => chop([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/choppinessIndex.csv'));
    assertColumn(chop(data.high, data.low, data.close), data.chop);
  });
});
