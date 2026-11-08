// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';
import { ad } from '../volume/accumulationDistribution';

/**
 * Chaikin oscillator result object.
 */
export interface COResult {
  adResult: number[];
  coResult: number[];
}

/**
 * Optional configuration of Chaikin oscillator parameters.
 */
export interface COConfig {
  fast?: number;
  slow?: number;
}

/**
 * The default configuration of Chaikin oscillator.
 */
export const CODefaultConfig: Required<COConfig> = {
  fast: 3,
  slow: 10,
};

/**
 * The ChaikinOscillator function measures the momentum of the
 * Accumulation/Distribution (A/D) using the Moving Average
 * Convergence Divergence (MACD) formula. It takes the
 * difference between fast and slow periods EMA of the A/D.
 *
 * ```
 * CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @title Chaikin Oscillator (CO)
 * @example
 * ```TypeScript
 * import { co } from 'indicatorts';
 *
 * const defaultConfig =  { fast: 3, slow: 10 };
 * const { adResult, coResult } = co(highs, lows, closings, volumes, defaultConfig);
 *
 * // Alternatively:
 * // const { adResult, coResult } = chaikinOscillator(highs, lows, closings, volumes, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @return chaikin oscillator.
 */
export function co(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[],
  config: COConfig = {}
): COResult {
  const { fast, slow } = { ...CODefaultConfig, ...config };
  const adResult = ad(highs, lows, closings, volumes);
  const coResult = subtract(
    ema(adResult, { period: fast }),
    ema(adResult, { period: slow })
  );

  return { adResult, coResult };
}

// Export full name
export { co as chaikinOscillator };
