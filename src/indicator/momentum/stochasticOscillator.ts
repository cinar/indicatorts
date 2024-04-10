// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { mmin } from '../trend/mmin';
import { mmax } from '../trend/mmax';
import { sma } from '../trend/sma';

/**
 * Stochastic oscillator result object.
 */
export interface StochasticOscillatorResult {
  k: number[];
  d: number[];
}

/**
 * Optional configuration of stochastic oscillator parameters.
 */
export interface StochasticOscillatorConfig {
  kPeriod?: number;
  dPeriod?: number;
}

/**
 * The default configuration of stochastic oscillator.
 */
export const StochasticOscillatorDefaultConfig: Required<StochasticOscillatorConfig> =
  {
    kPeriod: 14,
    dPeriod: 3,
  };

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
 * @param config configuration.
 * @return stochastic oscillator result object.
 */
export function stoch(
  highs: number[],
  lows: number[],
  closings: number[],
  config: StochasticOscillatorConfig = {}
): StochasticOscillatorResult {
  const { kPeriod, dPeriod } = {
    ...StochasticOscillatorDefaultConfig,
    ...config,
  };
  const highestHigh = mmax(highs, { period: kPeriod });
  const lowestLow = mmin(lows, { period: kPeriod });

  const kValue = multiplyBy(
    100,
    divide(subtract(closings, lowestLow), subtract(highestHigh, lowestLow))
  );

  const dValue = sma(kValue, { period: dPeriod });

  return {
    k: kValue,
    d: dValue,
  };
}

// Export full name
export { stoch as stochasticOscillator };
