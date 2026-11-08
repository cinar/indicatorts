// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { fv } from './futureValue';

describe('Future Value (FV)', () => {
  it('should compound once per year', () => {
    expect(fv(100, 0.5, 2)).toBe(225);
    expect(fv(100, 0, 10)).toBe(100);
    expect(fv(100, 0.5, 0)).toBe(100);
  });

  it('should match the reference data', () => {
    // Expected values from the testdata of the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93).
    const data = readCsv(join(__dirname, 'testdata/futureValue.csv'));
    const actual = data.pv.map((value, i) =>
      fv(value, data.rate[i], data.years[i])
    );
    assertColumn(actual, data.fv);
  });
});
