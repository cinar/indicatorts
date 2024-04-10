// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { bb } from './bollingerBands';
import { bbw } from './bollingerBandsWidth';

describe('Bollinger Bands Width (BBW)', () => {
  const closings = [
    2, 4, 6, 8, 12, 14, 16, 18, 20, 2, 4, 6, 8, 12, 14, 16, 18, 20, 2, 4, 6, 8,
    12, 14, 16, 18, 20, 2, 4, 6, 8, 12, 14, 16, 18, 20,
  ];
  const bbResult = bb(closings, { period: 14 });

  it('should be able to compute with a config', () => {
    const expectedwidth = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.43, 2.12, 1.91, 1.8, 1.76, 2.08,
      2.31, 2.47, 2.53, 2.43, 2.12, 1.91, 1.8, 1.76, 2.08, 2.31, 2.47, 2.53,
      2.43, 2.12, 1.91, 1.8, 1.76,
    ];

    const expectedwidthEma = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.17, 0.24, 0.3, 0.36, 0.43,
      0.5, 0.58, 0.66, 0.73, 0.78, 0.82, 0.86, 0.9, 0.94, 1, 1.06, 1.11, 1.16,
      1.2, 1.23, 1.25, 1.27,
    ];

    const actual = bbw(bbResult, { period: 50 });
    deepStrictEqual(roundDigitsAll(2, actual.width), expectedwidth);
    deepStrictEqual(roundDigitsAll(2, actual.widthEma), expectedwidthEma);
  });

  it('should be able to compute without a config', () => {
    const expectedwidth = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.43, 2.12, 1.91, 1.8, 1.76, 2.08,
      2.31, 2.47, 2.53, 2.43, 2.12, 1.91, 1.8, 1.76, 2.08, 2.31, 2.47, 2.53,
      2.43, 2.12, 1.91, 1.8, 1.76,
    ];

    const expectedwidthEma = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.1, 0.14, 0.18, 0.21, 0.25,
      0.3, 0.34, 0.39, 0.44, 0.47, 0.51, 0.53, 0.56, 0.59, 0.63, 0.67, 0.71,
      0.75, 0.78, 0.81, 0.83, 0.85,
    ];

    const actual = bbw(bbResult);
    deepStrictEqual(roundDigitsAll(2, actual.width), expectedwidth);
    deepStrictEqual(roundDigitsAll(2, actual.widthEma), expectedwidthEma);
  });
});
