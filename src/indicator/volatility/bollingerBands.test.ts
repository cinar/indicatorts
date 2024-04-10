// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { bb } from './bollingerBands';

describe('Bollinger Bands', () => {
  it('should be able to compute the bollinger bands', () => {
    const closings = [
      2, 4, 6, 8, 12, 14, 16, 18, 20, 2, 4, 6, 8, 12, 14, 16, 18, 20, 2, 4, 6,
      8, 12, 14, 16, 18, 20, 2, 4, 6, 8, 12, 14, 16, 18, 20,
    ];

    const expectedUpperBand = [
      2, 3, 4, 5, 6.4, 7.67, 8.86, 10, 11.11, 10.2, 9.64, 9.33, 9.23, 9.43,
      9.73, 10.13, 10.59, 11.11, 10.63, 22.78, 22.56, 22.45, 22.56, 22.84,
      23.22, 23.72, 24.32, 23.9, 22.78, 22.56, 22.45, 22.56, 22.84, 23.22,
      23.72, 24.32,
    ];

    const expectedMiddleBand = [
      2, 3, 4, 5, 6.4, 7.67, 8.86, 10, 11.11, 10.2, 9.64, 9.33, 9.23, 9.43,
      9.73, 10.13, 10.59, 11.11, 10.63, 10.3, 10.5, 10.7, 11, 11.3, 11.5, 11.7,
      11.9, 11.1, 10.3, 10.5, 10.7, 11, 11.3, 11.5, 11.7, 11.9,
    ];

    const expectedLowerBand = [
      2, 3, 4, 5, 6.4, 7.67, 8.86, 10, 11.11, 10.2, 9.64, 9.33, 9.23, 9.43,
      9.73, 10.13, 10.59, 11.11, 10.63, -2.18, -1.56, -1.05, -0.56, -0.24,
      -0.22, -0.32, -0.52, -1.7, -2.18, -1.56, -1.05, -0.56, -0.24, -0.22,
      -0.32, -0.52,
    ];

    const actual = bb(closings);
    deepStrictEqual(roundDigitsAll(2, actual.upperBand), expectedUpperBand);
    deepStrictEqual(roundDigitsAll(2, actual.middleBand), expectedMiddleBand);
    deepStrictEqual(roundDigitsAll(2, actual.lowerBand), expectedLowerBand);
  });
});
