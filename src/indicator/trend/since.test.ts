// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { deepStrictEqual } from 'assert';
import { since } from './since';

describe('Since last change count', () => {
  it('should be able to compute', () => {
    const values = [1, 2, 2, 3, 4, 4, 4, 4, 5, 6];
    const expected = [0, 0, 1, 0, 0, 1, 2, 3, 0, 0];

    const actual = since(values);
    deepStrictEqual(actual, expected);
  });

  it('should return an empty array for empty input', () => {
    expect(since([])).toStrictEqual([]);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/since.csv'));
    // The closings are rounded to whole dollars, so values repeat.
    assertColumn(since(data.value), data.since);
  });
});
