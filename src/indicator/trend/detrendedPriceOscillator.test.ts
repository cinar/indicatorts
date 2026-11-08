// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { dpo } from './detrendedPriceOscillator';

describe('Detrended Price Oscillator (DPO)', () => {
  it('should subtract the shifted simple moving average', () => {
    // period 2: k = 2, SMA = [NaN, 1.5, 2.5, 3.5, 4.5].
    const actual = dpo([1, 2, 3, 4, 5], { period: 2 });
    expect(actual).toStrictEqual([NaN, NaN, NaN, 2.5, 2.5]);
  });

  it('should return no values for empty input', () => {
    expect(dpo([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(
      join(__dirname, 'testdata/detrendedPriceOscillator.csv')
    );
    assertColumn(dpo(data.close), data.dpo);
  });
});
