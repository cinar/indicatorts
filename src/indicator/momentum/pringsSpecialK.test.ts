// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { specialK } from './pringsSpecialK';

describe("Pring's Special K", () => {
  it('should leave the first 724 values NaN', () => {
    const closings = Array.from({ length: 726 }, (_, i) => 100 + i);
    const actual = specialK(closings);
    expect(actual.findIndex(Number.isFinite)).toBe(724);
  });

  it('should return no values for empty input', () => {
    expect(specialK([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    // Special K needs 725 bars, more than the year of prices used by the
    // other tests, so this file holds a deterministic synthetic series:
    // 100 + 0.05i + 10 sin(i / 15) + 4 sin(i / 4), rounded to 2 digits.
    const data = readCsv(join(__dirname, 'testdata/pringsSpecialK.csv'));
    assertColumn(specialK(data.close), data.specialK, 4);
  });
});
