// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { stochastic } from './stochastic';

describe('Stochastic', () => {
  it('should be able to compute with a config', () => {
    // K = [NaN, 100, 0, 100], D = SMA(K, 2) = [NaN, NaN, 50, 50].
    const actual = stochastic([1, 3, 1, 2], { period: 2, dPeriod: 2 });
    expect(actual.k).toStrictEqual([NaN, NaN, 0, 100]);
    expect(actual.d).toStrictEqual([NaN, NaN, 50, 50]);
  });

  it('should return 50 for a window without a range', () => {
    const actual = stochastic([5, 5, 5], { period: 2, dPeriod: 1 });
    expect(actual.k).toStrictEqual([NaN, 50, 50]);
  });

  it('should return no values for empty input', () => {
    expect(stochastic([]).k).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/stochastic.csv'));
    const actual = stochastic(data.close);
    assertColumn(actual.k, data.k);
    assertColumn(actual.d, data.d);
  });
});
