// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';

describe('Exponential Moving Average (EMA)', () => {
  const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];

  it('should be able to compute with a config', () => {
    const expected = [
      2, 3.333, 5.111, 7.037, 10.346, 12.782, 14.927, 16.976, 18.992,
    ];

    const actual = ema(values, { period: 2 });

    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [
      2, 2.308, 2.876, 3.664, 4.947, 6.339, 7.826, 9.391, 11.023,
    ];

    const actual = ema(values);

    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });
});
