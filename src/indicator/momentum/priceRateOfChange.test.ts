// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { roc } from './priceRateOfChange';

describe('Price Rate of Change (ROC)', () => {
  const values = [1, 3, 5, 4, 2, 5, 3];

  it('should be able to compute with a config', () => {
    const expected = [0, 0, 0, 0, 100, 66.67, -40];

    const actual = roc(values, { period: 4 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 0, 0, 300, -33.33, 0, -25];

    const actual = roc(values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/priceRateOfChange.csv'));
    assertColumn(roc(data.close), data.roc);
  });
});
