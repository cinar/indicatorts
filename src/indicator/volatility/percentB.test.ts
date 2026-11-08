// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { percentB } from './percentB';

describe('Percent B (%B)', () => {
  it('should place the close between the bands', () => {
    // SMA = 2, std = 1, bands 0 and 4, close 3.
    expect(percentB([1, 3], { period: 2 })).toStrictEqual([NaN, 0.75]);
  });

  it('should be 0.5 when the bands meet', () => {
    expect(percentB([5, 5], { period: 2 })).toStrictEqual([NaN, 0.5]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/percentB.csv'));
    assertColumn(percentB(data.close), data.percentB, 4);
  });
});
