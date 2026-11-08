// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { elderRay } from './elderRay';

describe('Elder-Ray Index', () => {
  it('should measure the high and low from the EMA', () => {
    const actual = elderRay([5, 8], [1, 2], [2, 4], { period: 2 });
    expect(actual.bullPower).toStrictEqual([NaN, 5]);
    expect(actual.bearPower).toStrictEqual([NaN, -1]);
  });

  it('should throw on mismatched lengths', () => {
    expect(() => elderRay([1], [1, 2], [1])).toThrow();
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/elderRay.csv'));
    const actual = elderRay(data.high, data.low, data.close);
    assertColumn(actual.bullPower, data.bullPower);
    assertColumn(actual.bearPower, data.bearPower);
  });
});
