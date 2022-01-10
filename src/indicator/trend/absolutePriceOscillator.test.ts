// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {roundDigitsAll} from '../../helper/numArray';
import {absolutePriceOscillator} from './absolutePriceOscillator';

describe('Absolute Price Oscillator (APO)', () => {
  it('should be able to compute APO', () => {
    const values = [1, 2, 1, 5, 8, 10, 4, 6, 5, 2];
    const expected = [0, 0.33, 0, 1.26, 2.26, 2.65, 0.14, 0.22, -0.14, -1.19];
    const fastPeriod = 2;
    const slowPeriod = 5;

    const actual = absolutePriceOscillator(fastPeriod, slowPeriod, values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
