// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { fisher } from './fisherTransform';

describe('Fisher Transform', () => {
  it('should transform the position within the range', () => {
    // x = [NaN, 1, -1, 1], clamped to 0.999.
    const actual = fisher([1, 3, 1, 2], { period: 2 });
    expect(roundDigitsAll(4, actual)).toStrictEqual([
      NaN,
      3.8002,
      -3.8002,
      3.8002,
    ]);
    expect(fisher([1, 3, 2], { period: 3 })[2]).toBe(0);
  });

  it('should be NaN for a window without a range', () => {
    expect(fisher([4, 4], { period: 2 })).toStrictEqual([NaN, NaN]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/fisherTransform.csv'));
    assertColumn(fisher(data.close), data.fisher, 4);
  });
});
