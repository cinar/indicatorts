// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {roundDigitsAll} from '../../helper/numArray';
import {defaultKdj} from './kdj';

describe('KDJ indicator', () => {
  it('should be able to compute KDJ', () => {
    const lows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const highs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const closings = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const expectedK = [44.44, 45.91, 46.70, 48.12, 48.66, 48.95, 49.14, 49.26, 49.36, 49.26];
    const expectedD = [44.44, 45.18, 45.68, 46.91, 47.82, 48.58, 48.91, 49.12, 49.25, 49.30];
    const expectedJ = [44.44, 47.37, 48.72, 50.55, 50.32, 49.70, 49.58, 49.56, 49.57, 49.19];

    const kdjResult = defaultKdj(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, kdjResult.k), expectedK);
    deepStrictEqual(roundDigitsAll(2, kdjResult.d), expectedD);
    deepStrictEqual(roundDigitsAll(2, kdjResult.j), expectedJ);
  });
});
