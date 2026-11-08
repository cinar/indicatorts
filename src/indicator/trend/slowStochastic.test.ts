// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { slowStochastic } from './slowStochastic';

describe('Slow Stochastic', () => {
  it('should be able to compute with a config', () => {
    // Fast K = [NaN, 100, 0, 100, 0], Slow K = SMA(2) = [.., .., 50, 50, 50].
    const actual = slowStochastic([1, 3, 1, 3, 1], {
      period: 2,
      kPeriod: 2,
      dPeriod: 2,
    });
    expect(actual.k).toStrictEqual([NaN, NaN, NaN, 50, 50]);
    expect(actual.d).toStrictEqual([NaN, NaN, NaN, 50, 50]);
  });

  it('should return no values for empty input', () => {
    expect(slowStochastic([]).d).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/slowStochastic.csv'));
    const actual = slowStochastic(data.close);
    assertColumn(actual.k, data.k);
    assertColumn(actual.d, data.d);
  });
});
