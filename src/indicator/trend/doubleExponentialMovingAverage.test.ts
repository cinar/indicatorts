// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { dema } from './doubleExponentialMovingAverage';

describe('Double Exponential Moving Average (DEMA)', () => {
  const values = [1, 2, 1, 5, 8, 10, 4, 6, 5, 2];

  it('should be able to compute with a config', () => {
    const expected = [1, 1.13, 1.12, 1.64, 2.51, 3.55, 3.69, 4.07, 4.28, 4.07];

    const actual = dema(values, { period: 28 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 1.28, 1.22, 2.31, 4, 5.87, 5.61, 5.95, 5.91, 5.01];

    const actual = dema(values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
