// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { npv } from './netPresentValue';

describe('Net Present Value (NPV)', () => {
  it('should discount each cash flow by its period', () => {
    // 150 / 1.5 + 225 / 1.5^2 = 100 + 100
    expect(npv(0.5, [150, 225])).toBe(200);
    expect(npv(0.5, [-150, 225])).toBe(0);
    expect(npv(0, [1, 2, 3])).toBe(6);
  });

  it('should be 0 without cash flows', () => {
    expect(npv(0.1, [])).toBe(0);
  });

  it('should match the reference data', () => {
    // Expected values from the testdata of the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93).
    // Each row holds up to three cash flows; NaN marks a missing one.
    const data = readCsv(join(__dirname, 'testdata/netPresentValue.csv'));
    const actual = data.rate.map((rate, i) =>
      npv(rate, [data.cf1[i], data.cf2[i], data.cf3[i]].filter(Number.isFinite))
    );
    assertColumn(actual, data.npv);
  });
});
