// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { deepStrictEqual } from 'assert';
import { msum } from './movingSum';

describe('Moving Sum (MSUM)', () => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should be able to compute with a config', () => {
    const expected = [1, 3, 6, 10, 15, 21, 28, 35, 42, 49];

    const actual = msum(values, { period: 7 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 3, 6, 10, 14, 18, 22, 26, 30, 34];

    const actual = msum(values);
    deepStrictEqual(actual, expected);
  });

  it('should sum a window of zeros to exactly 0 after fractional values', () => {
    // 0.1 + 0.2 + 0.3 + 0.7, subtracted back out one at a time, leaves
    // floating point residue instead of 0 with a plain running sum.
    const actual = msum([0.1, 0.2, 0.3, 0.7, 0, 0, 0, 0, 0], { period: 4 });
    deepStrictEqual(actual.slice(7), [0, 0]);
    expect(Object.is(actual[8], 0)).toBe(true);
  });

  it('should limit a NaN to the windows that contain it', () => {
    const actual = msum([1, 2, NaN, 4, 5, 6, 7], { period: 2 });
    deepStrictEqual(actual, [1, 3, NaN, NaN, 9, 11, 13]);
  });

  it('should limit an Infinity to the windows that contain it', () => {
    const actual = msum([1, Infinity, 3, 4, -Infinity, 6, 7], { period: 2 });
    deepStrictEqual(actual, [
      1,
      Infinity,
      Infinity,
      7,
      -Infinity,
      -Infinity,
      13,
    ]);
  });
});
