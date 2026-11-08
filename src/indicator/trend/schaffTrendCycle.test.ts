// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { stc } from './schaffTrendCycle';

describe('Schaff Trend Cycle (STC)', () => {
  it('should leave the warm-up period NaN', () => {
    const closings = Array.from({ length: 12 }, (_, i) => 10 + (i % 3));
    const actual = stc(closings, { fast: 2, slow: 3, kPeriod: 3, dPeriod: 2 });
    // slow - 1 + 2 * (kPeriod + dPeriod - 2) = 8
    expect(actual.findIndex(Number.isFinite)).toBe(8);
  });

  it('should return no values for empty input', () => {
    expect(stc([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    // The Go MovingMin and MovingMax dropped a 0 from their first window,
    // which the Stochastic %D series starts with here; the expected values
    // were generated with that fixed.
    const data = readCsv(join(__dirname, 'testdata/schaffTrendCycle.csv'));
    assertColumn(stc(data.close), data.stc);
  });
});
