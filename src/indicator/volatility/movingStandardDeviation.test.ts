// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { mstd } from './movingStandardDeviation';

describe('Standard deviation (MSTD)', () => {
  const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];

  it('should be able to compute with a config', () => {
    const expected = [0, 1, 1, 1, 2, 1, 1, 1, 1];

    const actual = mstd(values, { period: 2 });
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 0, 0, 2.236, 2.958, 3.162, 2.958, 2.236, 2.236];

    const actual = mstd(values);
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });
});
