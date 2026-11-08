// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { rvi } from './relativeVigorIndex';

describe('Relative Vigor Index (RVI)', () => {
  it('should compare the close-open move with the range', () => {
    // Close - Open = 1 and High - Low = 4 on every bar.
    const openings = [1, 2, 3, 4, 5];
    const closings = openings.map((o) => o + 1);
    const highs = openings.map((o) => o + 3);
    const lows = openings.map((o) => o - 1);
    const actual = rvi(openings, highs, lows, closings, {
      period: 1,
      signalPeriod: 2,
    });
    expect(actual.rvi).toStrictEqual([NaN, NaN, NaN, NaN, 0.25]);
    expect(actual.signal).toStrictEqual([NaN, NaN, NaN, NaN, 0.25]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => rvi([1], [1], [1], [1, 2])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/relativeVigorIndex.csv'));
    const actual = rvi(data.open, data.high, data.low, data.close);
    assertColumn(actual.rvi, data.rvi, 4);
    assertColumn(actual.signal, data.signal, 4);
  });
});
