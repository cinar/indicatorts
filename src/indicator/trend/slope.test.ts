// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { slope } from './slope';

describe('Slope', () => {
  it('should be able to compute with a config', () => {
    expect(slope([1, 3, 9, 4], { period: 2 })).toStrictEqual([
      NaN,
      NaN,
      4,
      0.5,
    ]);
  });

  it('should return no values for empty input', () => {
    expect(slope([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/slope.csv'));
    assertColumn(slope(data.close), data.slope, 4);
  });
});
