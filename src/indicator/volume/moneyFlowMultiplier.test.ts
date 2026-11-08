// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { mfm } from './moneyFlowMultiplier';

describe('Money Flow Multiplier (MFM)', () => {
  it('should place the close within the range', () => {
    expect(mfm([10, 10, 10, 5], [0, 0, 0, 5], [10, 5, 0, 5])).toStrictEqual([
      1, 0, -1, 0,
    ]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => mfm([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/moneyFlowMultiplier.csv'));
    assertColumn(mfm(data.high, data.low, data.close), data.mfm, 4);
  });
});
