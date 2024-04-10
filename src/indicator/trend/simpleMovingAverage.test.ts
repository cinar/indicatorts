// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { sma } from './simpleMovingAverage';

describe('Simple Moving Average (SMA)', () => {
  const values = [2, 4, 6, 8, 10];

  it('should be able to compute with a config', () => {
    const expected = [2, 3, 4, 5, 7];

    const actual = sma(values, { period: 4 });

    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [2, 3, 5, 7, 9];

    const actual = sma(values);

    deepStrictEqual(actual, expected);
  });
});
