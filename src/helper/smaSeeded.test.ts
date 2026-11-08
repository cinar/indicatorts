// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { smaSeeded } from './smaSeeded';

/** Adds the value to the previous result. */
const accumulate = (previous: number, value: number): number =>
  previous + value;

describe('SMA seeded', () => {
  it('should start from the SMA of the first period values', () => {
    expect(smaSeeded([1, 2, 3, 4, 5], 3, accumulate)).toStrictEqual([
      NaN,
      NaN,
      2,
      6,
      11,
    ]);
  });

  it('should skip leading non-finite values', () => {
    expect(smaSeeded([NaN, NaN, 2, 4, 6], 2, accumulate)).toStrictEqual([
      NaN,
      NaN,
      NaN,
      3,
      9,
    ]);
  });

  it('should return NaN when there are fewer values than the period', () => {
    expect(smaSeeded([1, 2], 3, accumulate)).toStrictEqual([NaN, NaN]);
    expect(smaSeeded([NaN, 1, 2], 3, accumulate)).toStrictEqual([
      NaN,
      NaN,
      NaN,
    ]);
  });

  it('should return NaN when no value is finite', () => {
    expect(smaSeeded([NaN, NaN], 1, accumulate)).toStrictEqual([NaN, NaN]);
  });

  it('should return no values for empty input', () => {
    expect(smaSeeded([], 3, accumulate)).toStrictEqual([]);
  });
});
