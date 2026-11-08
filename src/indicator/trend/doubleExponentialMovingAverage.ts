// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { multiplyBy, subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';
import { Seed } from '../types';

/**
 * Optional configuration of DEMA parameters.
 */
export interface DEMAConfig {
  period?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of DEMA.
 */
export const DEMADefaultConfig: Required<DEMAConfig> = {
  period: 12,
  seed: 'first',
};

/**
 * Dema calculates the Double Exponential Moving Average (DEMA).
 *
 * ```
 * DEMA = (2 * EMA(values)) - EMA(EMA(values))
 * ```
 *
 * Based on [Double Exponential Moving Average (DEMA)](https://www.investopedia.com/terms/d/double-exponential-moving-average.asp).
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { dema } from 'indicatorts';
 *
 * const defaultConfig = { period: 12 };
 * const result = dema(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = doubleExponentialMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration
 * @return dema values.
 */
export function dema(values: number[], config: DEMAConfig = {}): number[] {
  const { period, seed } = { ...DEMADefaultConfig, ...config };
  const ema1 = ema(values, { period, seed });
  const ema2 = ema(ema1, { period, seed });

  const result = subtract(multiplyBy(2, ema1), ema2);

  return result;
}

// Export full name
export { dema as doubleExponentialMovingAverage };
