// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { tema } from './tripleExponentialMovingAverage';

describe('Triple Exponential Moving Average (TEMA)', () => {
  const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];

  it('should be able to compute with a config', () => {
    const expected = [
      2, 3.568, 5.654, 7.844, 11.568, 14.18, 16.324, 18.297, 20.222,
    ];

    const actual = tema(values, { period: 4 });
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [
      2, 3.926, 6, 8.025, 11.948, 14.088, 16.032, 18.001, 19.993,
    ];

    const actual = tema(values);
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });
});
