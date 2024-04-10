// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { cmo } from './chaikinOscillator';

describe('Chaikin Oscillator', () => {
  const highs = [10, 11, 12, 13, 14, 15, 16, 17];
  const lows = [1, 2, 3, 4, 5, 6, 7, 8];
  const closings = [5, 6, 7, 8, 9, 10, 11, 12];
  const volumes = [100, 200, 300, 400, 500, 600, 700, 800];

  it('should be able to compute co', () => {
    const expected = [0, -7.41, -18.52, -31.69, -46.09, -61.27, -76.95, -92.97];

    const actual = cmo(highs, lows, closings, volumes, {
      fast: 2,
      slow: 5,
    });
    deepStrictEqual(roundDigitsAll(2, actual.co), expected);
  });

  it('should be able to compute co with defaults', () => {
    const expected = [
      0, -7.07, -19.93, -37.52, -58.98, -83.61, -110.83, -140.17,
    ];

    const actual = cmo(highs, lows, closings, volumes);
    deepStrictEqual(roundDigitsAll(2, actual.co), expected);
  });
});
