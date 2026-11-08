// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { trix } from './tripleExponentialAverage';

describe('Triple Exponential Average (TRIX)', () => {
  const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];

  it('should be able to compute with a config', () => {
    const expected = [0, 0.01, 0.03, 0.06, 0.1, 0.14, 0.17, 0.19, 0.2];

    const actual = trix(values, { period: 9 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute witout a config', () => {
    const expected = [0, 0.06, 0.17, 0.26, 0.33, 0.33, 0.3, 0.25, 0.21];

    const actual = trix(values);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should match the reference data', () => {
    const data = readCsv(
      join(__dirname, 'testdata/tripleExponentialAverage.csv')
    );
    // TRIX is a ratio, so it is compared with more digits.
    assertColumn(trix(data.close), data.trix, 6);
  });

  it('should match TA-Lib with an SMA seed', () => {
    // Expected values from TA-Lib 0.8.3 TRIX(4) divided by 100, since TA-Lib returns a percentage.
    const data = readCsv(
      join(__dirname, 'testdata/tripleExponentialAverage.talib.csv')
    );
    assertColumn(trix(data.close, { seed: 'sma' }), data.trix, 6);
  });
});
