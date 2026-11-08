// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { coppockCurve } from './coppockCurve';

describe('Coppock Curve', () => {
  it('should be able to compute with a config', () => {
    // ROC(1) = [NaN, 100, 50] percent, doubled and averaged with WMA(1).
    const actual = coppockCurve([1, 2, 3], {
      rocPeriod1: 1,
      rocPeriod2: 1,
      wmaPeriod: 1,
    });
    expect(actual).toStrictEqual([NaN, 200, 100]);
  });

  it('should return no values for empty input', () => {
    expect(coppockCurve([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/coppockCurve.csv'));
    assertColumn(coppockCurve(data.close), data.coppockCurve);
  });
});
