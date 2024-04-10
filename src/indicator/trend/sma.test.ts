// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { sma } from './sma';

describe('Simple Moving Average (SMA)', () => {
  it('should be able to compute with a config', () => {
    const values = [2, 4, 6, 8, 10];
    const expected = [2, 3, 5, 7, 9];

    const actual = sma(values, { period: 2 });

    deepStrictEqual(actual, expected);
  });

  // TODO: Test - without a config
});
