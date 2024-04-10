// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { rsi } from './relativeStrengthIndex';

describe('Relative Strength Index (RSI)', () => {
  const closings = [
    10, 12, 11, 11, 14, 16, 18, 17, 18, 19, 16, 14, 14, 15, 16, 19, 20, 22,
  ];

  it('should be able to compute with a config', () => {
    const expected = [
      0, 100, 66.67, 66.67, 83.33, 87.5, 90, 81.82, 83.33, 84.76, 65.74, 56.27,
      56.27, 59.93, 63.37, 71.6, 73.81, 77.71,
    ];

    const actual = rsi(closings, { period: 9 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [
      0, 100, 66.67, 66.67, 83.33, 87.5, 90, 81.82, 83.33, 84.62, 68.75, 61.11,
      61.11, 63.16, 65.13, 70.28, 71.78, 74.54,
    ];

    const actual = rsi(closings);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
