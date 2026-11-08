// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { fv } from './futureValue';
import { pv } from './presentValue';

describe('Present Value (PV)', () => {
  it('should discount once per year', () => {
    expect(pv(225, 0.5, 2)).toBe(100);
    expect(pv(100, 0, 10)).toBe(100);
  });

  it('should invert the future value', () => {
    expect(pv(fv(123.45, 0.07, 9), 0.07, 9)).toBeCloseTo(123.45, 10);
  });

  it('should match the reference data', () => {
    // Expected values from the testdata of the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93).
    const data = readCsv(join(__dirname, 'testdata/presentValue.csv'));
    const actual = data.fv.map((value, i) =>
      pv(value, data.rate[i], data.years[i])
    );
    assertColumn(actual, data.pv);
  });
});
