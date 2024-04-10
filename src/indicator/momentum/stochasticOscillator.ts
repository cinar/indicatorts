// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { mmin } from '../trend/mmin';
import { mmax } from '../trend/mmax';
import { sma } from '../trend/sma';

/**
 * Stochastic oscillator result object.
 */
export interface StochasticOscillator {
  k: number[];
  d: number[];
}

/**
 * Stochastic Oscillator. It is a momentum indicator that shows the
 * location of the closing relative to high-low range over a
 * set number of periods.
 *
 * K = (Closing - Lowest Low) / (Highest High - Lowest Low) * 100
 * D = 3-Period SMA of K
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return stochastic oscillator result object.
 */
export function stochasticOscillator(
  highs: number[],
  lows: number[],
  closings: number[]
): StochasticOscillator {
  const highestHigh = mmax(highs, { period: 14 });
  const lowestLow = mmin(lows, { period: 14 });

  const k = multiplyBy(
    100,
    divide(subtract(closings, lowestLow), subtract(highestHigh, lowestLow))
  );

  const d = sma(k, { period: 3 });

  return {
    k,
    d,
  };
}
