// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { tr } from './trueRange';

describe('True Range (TR)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute', () => {
    const expected = [4, 2, 3, 7, 2];

    const actual = tr(highs, lows, closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/trueRange.csv'));
    assertColumn(tr(data.high, data.low, data.close), data.tr);
  });
});
