// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { t3 } from './tillsonT3';

describe('Tillson T3 Moving Average (T3)', () => {
  it('should reproduce a constant input', () => {
    const actual = t3(new Array<number>(10).fill(7), { period: 2 });
    expect(roundDigitsAll(10, actual)).toStrictEqual([
      NaN,
      NaN,
      NaN,
      NaN,
      NaN,
      NaN,
      7,
      7,
      7,
      7,
    ]);
  });

  it('should return no values for empty input', () => {
    expect(t3([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    // TA-Lib 0.8.3 T3(5, 0.7) gives the same values.
    const data = readCsv(join(__dirname, 'testdata/tillsonT3.csv'));
    assertColumn(t3(data.close), data.t3);
  });
});
