// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { md } from './mcGinleyDynamic';

describe('McGinley Dynamic (MD)', () => {
  it('should be able to compute with a config', () => {
    // MD[1] = 10 + (20 - 10) / (2 * 2^4) = 10.3125
    expect(md([10, 20], { period: 2 })).toStrictEqual([10, 10.3125]);
  });

  it('should restart from the close after a zero', () => {
    expect(md([0, 5, 5])).toStrictEqual([0, 5, 5]);
  });

  it('should return no values for empty input', () => {
    expect(md([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    // Expected values from the Go version of this library,
    // github.com/cinar/indicator (commit 18a0b93), run on the same prices.
    const data = readCsv(join(__dirname, 'testdata/mcGinleyDynamic.csv'));
    assertColumn(md(data.close), data.md);
  });
});
