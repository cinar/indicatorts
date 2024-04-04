// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { mmin } from './mmin';

describe('Moving Min', () => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const expected = [1, 1, 1, 1, 2, 3, 4, 5, 6, 7];

  it('should be able to compute max', () => {
    const actual = mmin(values, { period: 4 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute max without a config', () => {
    const actual = mmin(values);
    deepStrictEqual(actual, expected);
  });
});
