// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { stochRsi } from './stochasticRsi';

describe('Stochastic RSI', () => {
  it('should place the RSI within its range', () => {
    // RSI(2) = [NaN, NaN, 50, 75, 25], StochRSI(2) = [.., .., .., 1, 0].
    const actual = stochRsi([1, 2, 1, 3, 1], { period: 2 });
    expect(actual.slice(0, 3)).toStrictEqual([NaN, NaN, NaN]);
    expect(actual[3]).toBe(1);
    expect(actual[4]).toBe(0);
  });

  it('should return no values for empty input', () => {
    expect(stochRsi([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    // TA-Lib 0.8.3 STOCHRSI(14, 14, 1) gives the same values, in percent.
    const data = readCsv(join(__dirname, 'testdata/stochasticRsi.csv'));
    assertColumn(stochRsi(data.close), data.stochRsi, 4);
  });
});
