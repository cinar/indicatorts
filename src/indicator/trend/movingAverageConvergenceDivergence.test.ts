// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { macd } from './movingAverageConvergenceDivergence';

describe('Moving Average Convergence Divergence (MACD)', () => {
  const closings = [10, 20, 10, 50, 80, 100, 40, 60, 50, 20];

  it('should be able to compute with a config', () => {
    const expectedMACD = [
      0, 0.64, 0.51, 2.98, 6.87, 11.24, 10.79, 11.62, 11.54, 9.44,
    ];
    const expectedSignal = [
      0, 0.16, 0.25, 0.93, 2.42, 4.62, 6.16, 7.53, 8.53, 8.76,
    ];

    const actual = macd(closings, { fast: 14, slow: 28, signal: 7 });
    deepStrictEqual(roundDigitsAll(2, actual.macdLine), expectedMACD);
    deepStrictEqual(roundDigitsAll(2, actual.signalLine), expectedSignal);
  });

  it('should be able to compute without a config', () => {
    const expectedMACD = [
      0, 0.8, 0.62, 3.66, 8.39, 13.6, 12.74, 13.52, 13.17, 10.36,
    ];
    const expectedSignal = [
      0, 0.16, 0.25, 0.93, 2.42, 4.66, 6.28, 7.72, 8.81, 9.12,
    ];

    const actual = macd(closings);
    deepStrictEqual(roundDigitsAll(2, actual.macdLine), expectedMACD);
    deepStrictEqual(roundDigitsAll(2, actual.signalLine), expectedSignal);
  });
});
