// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { mfv } from './moneyFlowVolume';

describe('Money Flow Volume (MFV)', () => {
  it('should weight the volume by the multiplier', () => {
    expect(mfv([10, 10], [0, 0], [10, 2.5], [100, 200])).toStrictEqual([
      100, -100,
    ]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => mfv([1], [1], [1], [1, 2])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/moneyFlowVolume.csv'));
    assertColumn(mfv(data.high, data.low, data.close, data.volume), data.mfv);
  });
});
