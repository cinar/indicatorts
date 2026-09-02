// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { strictEqual, throws } from 'assert';
import { NumRange } from './numRange';

describe('NumRange', () => {
  it('should be able to compute span', () => {
    const range = new NumRange(2, 10);
    strictEqual(range.span(), 8);
  });

  it('should be able to compute span of a flat range', () => {
    const range = new NumRange(5, 5);
    strictEqual(range.span(), 0);
  });

  it('should be able to merge multiple ranges', () => {
    const ranges = [
      new NumRange(2, 10),
      new NumRange(-5, 3),
      new NumRange(0, 20),
    ];

    const merged = NumRange.merge(ranges);
    strictEqual(merged.getMin(), -5);
    strictEqual(merged.getMax(), 20);
  });

  it('should be able to merge two ranges', () => {
    const ranges = [new NumRange(1, 4), new NumRange(6, 9)];

    const merged = NumRange.merge(ranges);
    strictEqual(merged.getMin(), 1);
    strictEqual(merged.getMax(), 9);
  });

  it('should throw when merging an empty array', () => {
    throws(() => NumRange.merge([]), Error);
  });

  it('should be able to compute range from values', () => {
    const range = NumRange.from([3, -1, 7, 2]);
    strictEqual(range.getMin(), -1);
    strictEqual(range.getMax(), 7);
  });
});
