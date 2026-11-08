// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';
import { Seed } from '../types';

/**
 * Moving average convergence divergence (MACD) result object.
 */
export interface MACDResult {
  macdLine: number[];
  signalLine: number[];
}

/**
 * Optional configuration of MACD parameters.
 */
export interface MACDConfig {
  fast?: number;
  slow?: number;
  signal?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of MACD.
 */
export const MACDDefaultConfig: Required<MACDConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
  seed: 'first',
};

/**
 * Moving Average Convergence Divergence (MACD).
 *
 * ```
 * MACD = 12-Period EMA - 26-Period EMA.
 * Signal = 9-Period EMA of MACD.
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { macd } from 'indicatorts';
 *
 * const defaultConfig = { fast: 12, slow: 26, signal: 9 };
 * const { macdLine, signalLine } = macd(closings);
 *
 * // Alternatively:
 * // const { macdLine, signalLine } = movingAverageConvergenceDivergence(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return macd result.
 */
export function macd(closings: number[], config: MACDConfig = {}): MACDResult {
  const { fast, slow, signal, seed } = {
    ...MACDDefaultConfig,
    ...config,
  };

  // With an SMA seed, the fast EMA is seeded over the bars that end where
  // the slow EMA's seed ends, so both start at the same bar, as in TA-Lib.
  const fastInput =
    seed === 'sma'
      ? closings.map((closing, i) => (i < slow - fast ? NaN : closing))
      : closings;
  const emaFast = ema(fastInput, { period: fast, seed });
  const emaSlow = ema(closings, { period: slow, seed });

  const macdLine = subtract(emaFast, emaSlow);
  const signalLine = ema(macdLine, { period: signal, seed });

  return {
    macdLine,
    signalLine,
  };
}

// Export full name
export { macd as movingAverageConvergenceDivergence };
