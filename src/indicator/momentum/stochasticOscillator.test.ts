// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { stochasticOscillator } from './stochasticOscillator';

describe('Stochastic Oscillator', () => {
  it('should be able to compute result', () => {
    const highs = [
      127.01, 127.62, 126.59, 127.35, 128.17, 128.43, 127.37, 126.42, 126.9,
      126.85, 125.65, 125.72, 127.16, 127.72, 127.69, 128.22, 128.27, 128.09,
      128.27, 127.74,
    ];

    const lows = [
      125.36, 126.16, 124.93, 126.09, 126.82, 126.48, 126.03, 124.83, 126.39,
      125.72, 124.56, 124.57, 125.07, 126.86, 126.63, 126.8, 126.71, 126.8,
      126.13, 125.92,
    ];

    const closings = [
      126.0, 126.6, 127.1, 127.2, 128.1, 128.2, 126.3, 126.0, 126.6, 127.0,
      127.5, 128.0, 128.1, 127.29, 127.18, 128.01, 127.11, 127.73, 127.06,
      127.33,
    ];

    const expectedK = [
      38.79, 54.87, 80.67, 84.39, 97.84, 93.43, 39.14, 32.5, 49.17, 60.28,
      75.97, 88.89, 91.47, 70.54, 67.7, 89.15, 65.89, 81.91, 64.6, 74.66,
    ];

    const actual = stochasticOscillator(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual.k), expectedK);
  });
});
