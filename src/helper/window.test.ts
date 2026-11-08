// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import {
  changeRatio,
  lag,
  maskNaN,
  safeDivide,
  windowed,
  windowedMax,
  windowedMin,
  windowedSma,
  windowedStd,
  trueRanges,
} from './window';

describe('Window helpers', () => {
  it('should apply the function to full windows only', () => {
    const actual = windowed([1, 2, 3, 4], 2, (w) => w[0] * 10 + w[1]);
    expect(actual).toStrictEqual([NaN, 12, 23, 34]);
  });

  it('should leave windows with a non-finite value NaN', () => {
    const actual = windowedSma([NaN, 2, 4, Infinity, 6, 8, 10], 2);
    expect(actual).toStrictEqual([NaN, NaN, 3, NaN, NaN, 7, 9]);
  });

  it('should compute the moving max, min and standard deviation', () => {
    const values = [2, 4, 4, 4, 5, 5, 7, 9];
    expect(windowedMax(values, 3)).toStrictEqual([NaN, NaN, 4, 4, 5, 5, 7, 9]);
    expect(windowedMin(values, 3)).toStrictEqual([NaN, NaN, 2, 4, 4, 4, 5, 5]);
    expect(windowedStd(values, 8)[7]).toBe(2);
  });

  it('should lag the values', () => {
    expect(lag([1, 2, 3], 2)).toStrictEqual([NaN, NaN, 1]);
  });

  it('should compute the change ratio, with 0 for a zero base', () => {
    expect(changeRatio([2, 0, 3, 5], 1)).toStrictEqual([NaN, -1, 0, 2 / 3]);
  });

  it('should fall back on a zero denominator', () => {
    expect(safeDivide(1, 2, 7)).toBe(0.5);
    expect(safeDivide(1, 0, 7)).toBe(7);
  });

  it('should mask the values where the mask is NaN', () => {
    expect(maskNaN([1, 2, 3], [NaN, 0, 5])).toStrictEqual([NaN, 2, 3]);
  });

  it('should compute the true range from the previous close', () => {
    // Gap up, gap down and an inside bar.
    const actual = trueRanges([10, 15, 8, 9], [8, 13, 6, 7], [9, 14, 7, 8]);
    expect(actual).toStrictEqual([NaN, 6, 8, 2]);
  });
});
