// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { zScore } from './zScore';

describe('Z-Score', () => {
  it('should measure the distance from the average in deviations', () => {
    expect(zScore([1, 3], { period: 2 })).toStrictEqual([NaN, 1]);
  });

  it('should be 0 when every value is equal', () => {
    expect(zScore([5, 5], { period: 2 })).toStrictEqual([NaN, 0]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/zScore.csv'));
    assertColumn(zScore(data.close), data.zScore, 4);
  });
});
