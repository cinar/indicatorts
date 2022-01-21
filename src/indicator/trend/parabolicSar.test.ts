// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { Trend } from '../trend';
import { parabolicSar } from './parabolicSar';

describe('Parabolic SAR', () => {
  it('should be able to compute PSAR', () => {
    const highs = [
      3836.86, 3766.57, 3576.17, 3513.55, 3529.75, 3756.17, 3717.17, 3572.62,
      3612.43,
    ];

    const lows = [
      3643.25, 3542.73, 3371.75, 3334.02, 3314.75, 3558.21, 3517.79, 3447.9,
      3494.39,
    ];

    const closings = [
      3790.55, 3546.2, 3507.31, 3340.81, 3529.6, 3717.41, 3544.35, 3478.14,
      3612.08,
    ];

    const expectedPsar = [
      3836.86, 3836.86, 3836.86, 3808.95, 3770.96, 3314.75, 3314.75, 3323.58,
      3332.23,
    ];

    const expectedTrends = [
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.FALLING,
      Trend.RISING,
      Trend.RISING,
      Trend.RISING,
      Trend.RISING,
    ];

    const actual = parabolicSar(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual.psar), expectedPsar);
    deepStrictEqual(actual.trends, expectedTrends);
  });
});
