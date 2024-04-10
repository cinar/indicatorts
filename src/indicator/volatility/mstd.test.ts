// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { mstd } from './mstd';

describe('Standard deviation', () => {
  it('should be able to compute std', () => {
    const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];
    const expected = [0, 1, 1, 1, 2, 1, 1, 1, 1];
    const period = 2;

    const actual = mstd(values, { period });
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });
});
