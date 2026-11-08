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
    expect(roundDigitsAll(4, actual)).toStrictEqual([NaN, 0.1714, 0.031]);
  });

  it('should use the middle of the range for a flat window', () => {
    const actual = ehlersFisher([4, 4, 4], [4, 4, 4], { period: 2 });
    expect(actual).toStrictEqual([NaN, 0, 0]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => ehlersFisher([1], [1, 2])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/ehlersFisher.csv'));
    assertColumn(ehlersFisher(data.high, data.low), data.ehlersFisher, 4);
  });
});
