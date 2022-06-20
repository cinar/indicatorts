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
  const highestHigh14 = mmax(14, highs);
  const lowestLow14 = mmin(14, lows);

  const k = multiplyBy(
    100,
    divide(
      subtract(closings, lowestLow14),
      subtract(highestHigh14, lowestLow14)
    )
  );

  const d = sma(3, k);

  return {
    k,
    d,
  };
}
