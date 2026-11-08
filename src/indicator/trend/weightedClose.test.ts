// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { weightedClose } from './weightedClose';

describe('Weighted Close', () => {
  it('should count the close twice', () => {
    expect(weightedClose([12], [4], [8])).toStrictEqual([8]);
    expect(weightedClose([10], [2], [9])).toStrictEqual([7.5]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => weightedClose([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/weightedClose.csv'));
    assertColumn(
      weightedClose(data.high, data.low, data.close),
      data.weightedClose
    );
  });
});
