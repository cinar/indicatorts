// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { mmin } from './mmin';

describe('Moving Min', () => {
  it('should be able to compute min', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [1, 1, 1, 1, 2, 3, 4, 5, 6, 7];
    const period = 4;

    const actual = mmin(period, values);
    deepStrictEqual(actual, expected);
  });
});
