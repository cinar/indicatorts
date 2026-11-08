// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { smma } from './smoothedMovingAverage';

describe('Smoothed Moving Average (SMMA)', () => {
  it('should start from the simple moving average', () => {
    // SMMA[1] = (2 + 4) / 2 = 3, SMMA[2] = (3 * 1 + 7) / 2 = 5.
    expect(smma([2, 4, 7], { period: 2 })).toStrictEqual([NaN, 3, 5]);
  });

  it('should return no values for empty input', () => {
    expect(smma([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/smoothedMovingAverage.csv'));
    assertColumn(smma(data.close), data.smma);
  });
});
