// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { ema } from './ema';

describe('Exponential Moving Average (EMA)', () => {
  it('should be able to compute with a config', () => {
    const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];
    const expected = [
      2, 3.333, 5.111, 7.037, 10.346, 12.782, 14.927, 16.976, 18.992,
    ];

    const actual = ema(values, { period: 2 });

    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });

  // TODO: Test - without a config
});
