// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { divide, shiftRightAndFillBy, subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';
import { Seed } from '../types';

/**
 * Optional configuration of TRIX parameters.
 */
export interface TRIXConfig {
  period?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of TRIX.
 */
export const TRIXDefaultConfig: Required<TRIXConfig> = {
  period: 4,
  seed: 'first',
};

/**
 * Triple Exponential Average (TRIX) indicator is an oscillator used to
 * identify oversold and overbought markets, and it can also be used
 * as a momentum indicator. Like many oscillators, TRIX oscillates
 * around a zero line.
 *
 * ```
 * EMA1 = EMA(period, values)
 * EMA2 = EMA(period, EMA1)
 * EMA3 = EMA(period, EMA2)
 * TRIX = (EMA3 - Previous EMA3) / Previous EMA3
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { trix } from 'indicatorts';
 *
 * const defaultConfig = { period: 4 };
 * const result = trix(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = tripleExponentialAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @returns trix values.
 */
export function trix(values: number[], config: TRIXConfig = {}): number[] {
  const { period, seed } = { ...TRIXDefaultConfig, ...config };
  const ema1 = ema(values, { period, seed });
  const ema2 = ema(ema1, { period, seed });
  const ema3 = ema(ema2, { period, seed });
  const previous = shiftRightAndFillBy(1, ema3[0], ema3);
  const result = divide(subtract(ema3, previous), previous);

  return result;
}

// Export full name
export { trix as tripleExponentialAverage };
