// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { po } from './projectionOscillator';

describe('Projection Oscillator (PO)', () => {
  // Highs [10, 13, 12] have a regression slope of 3 at index 1 and 1 at
  // index 2; lows [8, 9, 10] have a slope of 1. At index 2 the highs
  // projected to the current bar are 10 + 2, 13 + 1 and 12, so PU = 14,
  // and the lows give PL = 10, making PO = 100 * (11 - 10) / (14 - 10).
  const highs = [10, 13, 12];
  const lows = [8, 9, 10];
  const closings = [9, 12, 11];

  it('should be able to compute with a config', () => {
    const expectedPO = [50, 75, 25];
    const expectedSPO = [50, 66.67, 38.89];

    const actual = po(highs, lows, closings, { period: 3, smooth: 2 });
    expect(roundDigitsAll(2, actual.poResult)).toStrictEqual(expectedPO);
    expect(roundDigitsAll(2, actual.spoResult)).toStrictEqual(expectedSPO);
  });

  it('should be able to compute without a config', () => {
    const expectedPO = [50, 75, 25];
    const expectedSPO = [50, 62.5, 43.75];

    const actual = po(highs, lows, closings);
    expect(roundDigitsAll(2, actual.poResult)).toStrictEqual(expectedPO);
    expect(roundDigitsAll(2, actual.spoResult)).toStrictEqual(expectedSPO);
  });

  it('should stay within 0 to 100 when closings are within the bar range', () => {
    const count = 200;
    const rangeHighs: number[] = [];
    const rangeLows: number[] = [];
    const rangeClosings: number[] = [];

    for (let i = 0; i < count; i++) {
      const mid = 100 + 10 * Math.sin(i / 7) + (i % 5);
      rangeHighs.push(mid + 1 + (i % 3));
      rangeLows.push(mid - 1 - (i % 4));
      rangeClosings.push(mid + ((i % 7) - 3) / 3);
    }

    const actual = po(rangeHighs, rangeLows, rangeClosings);
    for (const value of actual.poResult) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it('should be 50 when the projected bands are equal', () => {
    const flat = [10, 10, 10];
    const actual = po(flat, flat, flat, { period: 2 });
    expect(actual.poResult).toStrictEqual([50, 50, 50]);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/projectionOscillator.csv'));
    const actual = po(data.high, data.low, data.close);
    assertColumn(actual.poResult, data.poResult);
    assertColumn(actual.spoResult, data.spoResult);
  });
});
