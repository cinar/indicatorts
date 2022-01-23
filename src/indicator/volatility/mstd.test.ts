// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { mstd } from './mstd';

describe('Standard deviation', () => {
  it('should be able to compute std', () => {
    const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];
    const expected = [0, 0, 0, 2.236, 2.958, 3.162, 2.958, 2.236, 2.236];
    const period = 4;

    const actual = mstd(period, values);
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });
});
