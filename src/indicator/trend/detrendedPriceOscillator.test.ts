// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { dpo } from './detrendedPriceOscillator';

describe('Detrended Price Oscillator (DPO)', () => {
  it('should subtract the simple moving average from the lagged close', () => {
    // period 2: k = 2, SMA = [NaN, 1.5, 2.5, 3.5, 4.5],
    // lagged close = [NaN, NaN, 1, 2, 3].
    const actual = dpo([1, 2, 3, 4, 5], { period: 2 });
    expect(actual).toStrictEqual([NaN, NaN, -1.5, -1.5, -1.5]);
  });

  it('should return no values for empty input', () => {
    expect(dpo([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values match TA-Lib 0.8.3 DPO(20) and github.com/cinar/indicator
    // (commit 7017344) on the same prices.
    const data = readCsv(
      join(__dirname, 'testdata/detrendedPriceOscillator.csv')
    );
    assertColumn(dpo(data.close), data.dpo);
  });
});
