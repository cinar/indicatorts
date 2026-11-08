// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { ibs } from './internalBarStrength';

describe('Internal Bar Strength (IBS)', () => {
  it('should place the close within the range', () => {
    expect(ibs([10, 10, 10], [0, 0, 10], [10, 2.5, 10])).toStrictEqual([
      1, 0.25, 0,
    ]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => ibs([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/internalBarStrength.csv'));
    assertColumn(ibs(data.high, data.low, data.close), data.ibs, 4);
  });
});
