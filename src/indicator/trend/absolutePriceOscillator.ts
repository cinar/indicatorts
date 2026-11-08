// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';
import { Seed } from '../types';

/**
 * Optional configuration of APO parameters.
 */
export interface APOConfig {
  fast?: number;
  slow?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of APO.
 */
export const APODefaultConfig: Required<APOConfig> = {
  fast: 14,
  slow: 30,
  seed: 'first',
};

/**
 * Absolute Price Oscillator (APO) function calculates the difference between
 * a fast and a slow exponential moving average of the values. It is positive
 * when the fast EMA is above the slow EMA, and negative when it is below.
 *
 * ```
 * Fast = EMA(fastPeriod, values)
 * Slow = EMA(slowPeriod, values)
 * APO = Fast - Slow
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { apo } from 'indicatorts';
 *
 * const defaultConfig = { fast: 14, slow: 30 };
 * const result = apo(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = absolutePriceOscillator(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return apo array.
 */
export function apo(values: number[], config: APOConfig = {}): number[] {
  const {
    fast: fastPeriod,
    slow: slowPeriod,
    seed,
  } = {
    ...APODefaultConfig,
    ...config,
  };
  const fast = ema(values, { period: fastPeriod, seed });
  const slow = ema(values, { period: slowPeriod, seed });
  const result = subtract(fast, slow);

  return result;
}

// Export full name
export { apo as absolutePriceOscillator };
