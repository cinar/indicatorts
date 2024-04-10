// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { vwma } from './vwma';

describe('Volume Weighted Moving Average', () => {
  it('should be able to compute VWMA', () => {
    const closings = [20, 21, 21, 19, 16];
    const volumes = [100, 50, 40, 50, 100];
    const expected = [20, 20.33, 20.47, 20.29, 17.84];
    const period = 3;

    const actual = vwma(closings, volumes, { period });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute default', () => {
    const closings = [20, 21, 21, 19, 16];
    const volumes = [100, 50, 40, 50, 100];
    const expected = [20, 20.33, 20.47, 20.17, 18.94];

    const actual = vwma(closings, volumes);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
