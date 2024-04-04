// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { mmax } from './mmax';

describe('Moving Max', () => {
  const values = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const expected = [10, 10, 10, 10, 9, 8, 7, 6, 5, 4];

  it('should be able to compute max', () => {
    const actual = mmax(values, { period: 4 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute max without a config', () => {
    const actual = mmax(values);
    deepStrictEqual(actual, expected);
  });
});
