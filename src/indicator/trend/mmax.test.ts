// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {mmax} from './mmax';

describe('Moving Max', () => {
  it('should be able to compute max', () => {
    const values = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const expected = [10, 10, 10, 10, 9, 8, 7, 6, 5, 4];
    const period = 4;

    const actual = mmax(period, values);
    deepStrictEqual(actual, expected);
  });
});
