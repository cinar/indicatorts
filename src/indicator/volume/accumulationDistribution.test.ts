// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { ad } from './accumulationDistribution';

describe('Accumulation/Distribution (A/D)', () => {
  it('should be able to compute', () => {
    const highs = [10, 9, 12, 14, 12];
    const lows = [6, 7, 9, 12, 10];
    const closings = [9, 11, 7, 10, 8];
    const volumes = [100, 200, 300, 400, 500];

    const expected = [50, 650, -50, -1250, -2750];

    const actual = ad(highs, lows, closings, volumes);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
