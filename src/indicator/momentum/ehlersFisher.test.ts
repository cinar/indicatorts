// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { ehlersFisher } from './ehlersFisher';

describe('Ehlers Fisher Transform', () => {
  it('should smooth the value and the transform', () => {
    // Prices [1, 3, 2]: normalized = [NaN, 1, 0], Value1 = [.., 0.33, -0.1089].
    const actual = ehlersFisher([1, 3, 2], [1, 3, 2], { period: 2 });
    expect(roundDigitsAll(4, actual)).toStrictEqual([NaN, 0.3428, 0.0621]);
  });

  it('should use the middle of the range for a flat window', () => {
    const actual = ehlersFisher([4, 4, 4], [4, 4, 4], { period: 2 });
    expect(actual).toStrictEqual([NaN, 0, 0]);
  });

  it('should clamp Value1 to +-0.999 once it passes +-0.99', () => {
    const highs: number[] = [];
    const lows: number[] = [];
    for (let i = 0; i < 40; i++) {
      const mid = i < 20 ? 100 + i : 100 + (38 - i);
      highs.push(mid + 1);
      lows.push(mid - 1);
    }

    // Expected values from TA-Lib 0.8.3 FISHER(high, low, 5) /
    // github.com/cinar/indicator TestEhlersFisherClamp.
    const actual = ehlersFisher(highs, lows, { period: 5 });
    expect(actual.slice(0, 4)).toStrictEqual([NaN, NaN, NaN, NaN]);
    // Positive clamp triggers between index 14 (4.6860) and 15 (6.1432).
    expect(actual[14]).toBeCloseTo(4.686022806084, 9);
    expect(actual[15]).toBeCloseTo(6.143212570292, 9);
    // Negative clamp triggers between index 32 (-4.5068) and 33 (-6.0536).
    expect(actual[32]).toBeCloseTo(-4.506770165842, 9);
    expect(actual[33]).toBeCloseTo(-6.053586250171, 9);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => ehlersFisher([1], [1, 2])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values match TA-Lib 0.8.3 FISHER(10) and
    // github.com/cinar/indicator (commit 7017344) on the same prices.
    const data = readCsv(join(__dirname, 'testdata/ehlersFisher.csv'));
    assertColumn(ehlersFisher(data.high, data.low), data.ehlersFisher, 4);
  });
});
