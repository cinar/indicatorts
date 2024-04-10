// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { rsi } from './rsi';

describe('Relative Strength Index (RSI)', () => {
  it('should be able to compute the custom RSI', () => {
    const closings = [
      10, 12, 11, 11, 14, 16, 18, 17, 18, 19, 16, 14, 14, 15, 16, 19, 20, 22,
    ];

    const expected = [
      0, 100, 66.67, 66.67, 83.33, 87.5, 90, 81.82, 83.33, 84.62, 68.75, 61.11,
      61.11, 63.16, 65.13, 70.28, 71.78, 74.54,
    ];

    const actual = rsi(closings, { period: 14 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
