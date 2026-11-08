// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { tr } from './trueRange';
import { rma } from '../trend/rollingMovingAverage';
import { Seed } from '../types';

/**
 * Average true range result.
 */
export interface ATRResult {
  trLine: number[];
  atrLine: number[];
}

/**
 * Optional configuration of ATR parameters.
 */
export interface ATRConfig {
  period?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of ATR.
 */
export const ATRDefaultConfig: Required<ATRConfig> = {
  period: 14,
  seed: 'first',
};

/**
 * Average True Range (ATR). It is a technical analysis indicator that
 * measures market volatility by decomposing the entire range of stock
 * prices for that period.
 *
 * ```
 * TR = Max((High - Low), Abs(High - Previous Closing), Abs(Low - Previous Closing))
 * ATR = RMA TR (Wilder's smoothing)
 * ```
 *
 * Warm-up: the first bar's true range is its high minus its low (there is
 * no previous closing), and it is part of the first averaging window, so
 * every index has a value. TA-Lib starts from the second bar and leaves the
 * first `period` results empty, so the early values differ and converge over
 * the following bars. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { atr } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const { trLine, atrLine } = atr(highs, lows, closings, defaultConfig);
 *
 * // Alternatively:
 * // const { trLine, atrLine } = averageTrueRange(highs, lows, closings, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return atr tr line and atr line.
 */
export function atr(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ATRConfig = {}
): ATRResult {
  const { period, seed } = { ...ATRDefaultConfig, ...config };
  const trLine = tr(highs, lows, closings);

  // With an SMA seed, the first bar, which has no previous closing, is left
  // out of the average, as in TA-Lib.
  const averaged =
    seed === 'sma' ? trLine.map((value, i) => (i === 0 ? NaN : value)) : trLine;
  const atrLine = rma(averaged, { period, seed });

  return {
    trLine,
    atrLine,
  };
}

// Export full name
export { atr as averageTrueRange };
