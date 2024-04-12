// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { kdj } from './randomIndex';

describe('Random Index (KDJ)', () => {
  const lows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const highs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const closings = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  it('should be able to compute with a config', () => {
    const expectedK = [
      44.44, 45.91, 46.7, 47.2, 48.34, 48.78, 49.03, 49.19, 49.16, 48.99,
    ];
    const expectedD = [
      44.44, 45.18, 45.68, 46.06, 46.52, 46.89, 47.66, 48.21, 48.62, 48.92,
    ];
    const expectedJ = [
      44.44, 47.37, 48.72, 49.48, 51.97, 52.56, 51.78, 51.17, 50.26, 49.14,
    ];

    const kdjResult = kdj(highs, lows, closings, {
      rPeriod: 8,
      kPeriod: 4,
      dPeriod: 6,
    });
    deepStrictEqual(roundDigitsAll(2, kdjResult.k), expectedK);
    deepStrictEqual(roundDigitsAll(2, kdjResult.d), expectedD);
    deepStrictEqual(roundDigitsAll(2, kdjResult.j), expectedJ);
  });

  it('should be able to compute without a config', () => {
    const expectedK = [
      44.44, 45.91, 46.7, 48.12, 48.66, 48.95, 49.14, 49.26, 49.36, 49.26,
    ];
    const expectedD = [
      44.44, 45.18, 45.68, 46.91, 47.82, 48.58, 48.91, 49.12, 49.25, 49.3,
    ];
    const expectedJ = [
      44.44, 47.37, 48.72, 50.55, 50.32, 49.7, 49.58, 49.56, 49.57, 49.19,
    ];

    const kdjResult = kdj(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, kdjResult.k), expectedK);
    deepStrictEqual(roundDigitsAll(2, kdjResult.d), expectedD);
    deepStrictEqual(roundDigitsAll(2, kdjResult.j), expectedJ);
  });
});
