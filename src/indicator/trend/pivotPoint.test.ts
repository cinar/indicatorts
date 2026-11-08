// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { PivotPointMethod, pivotPoint } from './pivotPoint';

describe('Pivot Point', () => {
  // Previous bar: high 12, low 6, close 9; current open 10.
  const openings = [8, 10];
  const highs = [12, 0];
  const lows = [6, 0];
  const closings = [9, 0];

  it('should compute the standard levels from the previous bar', () => {
    const actual = pivotPoint(openings, highs, lows, closings);
    expect(actual.p).toStrictEqual([NaN, 9]);
    expect(actual.r1).toStrictEqual([NaN, 12]);
    expect(actual.s1).toStrictEqual([NaN, 6]);
    expect(actual.r4).toStrictEqual([NaN, 21]);
    expect(actual.s4).toStrictEqual([NaN, -3]);
  });

  it('should use the current open for the Woodie pivot', () => {
    const actual = pivotPoint(openings, highs, lows, closings, {
      method: 'woodie',
    });
    expect(actual.p).toStrictEqual([NaN, 9.5]);
    expect(actual.r4).toStrictEqual([NaN, NaN]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => pivotPoint([1], [1], [1], [1, 2])).toThrow();
  });

  const methods: [PivotPointMethod, string][] = [
    ['standard', 'pivotPoint'],
    ['woodie', 'pivotPoint.woodie'],
    ['camarilla', 'pivotPoint.camarilla'],
    ['fibonacci', 'pivotPoint.fibonacci'],
  ];

  for (const [method, file] of methods) {
    it(`should match the reference data for the ${method} method`, () => {
      // Expected values from the Go version of this library,
      // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
      // testdata/pivotPoint.csv holds the standard method.
      const data = readCsv(join(__dirname, 'testdata', `${file}.csv`));
      const actual = pivotPoint(data.open, data.high, data.low, data.close, {
        method,
      });
      for (const level of [
        'p',
        'r1',
        'r2',
        'r3',
        'r4',
        's1',
        's2',
        's3',
        's4',
      ] as const) {
        if (level in data) {
          assertColumn(actual[level], data[level]);
        } else {
          expect(actual[level].every(Number.isNaN)).toBe(true);
        }
      }
    });
  }
});
