// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { kst } from './knowSureThing';

describe('Know Sure Thing (KST)', () => {
  const config = {
    rocPeriod1: 1,
    rocPeriod2: 1,
    rocPeriod3: 1,
    rocPeriod4: 1,
    smaPeriod1: 1,
    smaPeriod2: 1,
    smaPeriod3: 1,
    smaPeriod4: 1,
    signalPeriod: 2,
  };

  it('should be able to compute with a config', () => {
    // ROC(1) = [NaN, 1, 0.5], KST = 10 * ROC, Signal = SMA(KST, 2).
    const actual = kst([1, 2, 3], config);
    expect(actual.kst).toStrictEqual([NaN, NaN, 5]);
    expect(actual.signal).toStrictEqual([NaN, NaN, 7.5]);
  });

  it('should return no values for empty input', () => {
    expect(kst([]).kst).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/knowSureThing.csv'));
    const actual = kst(data.close);
    assertColumn(actual.kst, data.kst, 4);
    assertColumn(actual.signal, data.signal, 4);
  });
});
