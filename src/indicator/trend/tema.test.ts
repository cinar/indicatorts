// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {roundDigitsAll} from '../../helper/numArray';
import {tema} from './tema';

describe('Triple Exponential Moving Average', () => {
  it('should be able to compute TEMA', () => {
    const values = [2, 4, 6, 8, 12, 14, 16, 18, 20];
    const expected = [2, 3.926, 6, 8.025, 11.948, 14.088, 16.032, 18.001, 19.993];
    const period = 2;

    const actual = tema(period, values);
    deepStrictEqual(roundDigitsAll(3, actual), expected);
  });
});
