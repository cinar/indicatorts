// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { mmax } from '../trend/movingMax';
import { mmin } from '../trend/movingMin';
import { atr } from './averageTrueRange';

/**
 * Chandelier exit result object.
 */
export interface CEResult {
  long: number[];
  short: number[];
}

/**
 * Optional configuration of Chandelier exit parameters.
 */
export interface CEConfig {
  period?: number;
}

/**
 * The default configuration of Chandelier exit.
 */
export const CEDefaultConfig: Required<CEConfig> = {
  period: 22,
};

/**
 * Chandelier Exit. It sets a trailing stop-loss based on the
 * Average True Range (ATR).
 *
 * ```
 * Chandelier Exit Long = 22-Period Highest High - ATR(22) * 3
 * Chandelier Exit Short = 22-Period Lowest Low + ATR(22) * 3
 * ```
 *
 * Warm-up: built on the average true range, which includes the first bar
 * in its first averaging window, so the early values can differ from other
 * libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { ce } from 'indicatorts';
 *
 * const defaultConfig = { period: 22 };
 * const { long, short } = ce(highs, lows, closings, defaultConfig);
 *
 * // Alternatively:
 * // const { long, short } = chandelierExit(highs, lows, closings, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return chandelier exit.
 */
export function ce(
  highs: number[],
  lows: number[],
  closings: number[],
  config: CEConfig = {}
): CEResult {
  const { period } = { ...CEDefaultConfig, ...config };
  const atrResult = atr(highs, lows, closings, { period });
  const atrLine3 = multiplyBy(3, atrResult.atrLine);
  const highestHigh = mmax(highs, { period });
  const lowestLow = mmin(lows, { period });

  const long = subtract(highestHigh, atrLine3);
  const short = add(lowestLow, atrLine3);

  return {
    long,
    short,
  };
}

// Export full name
export { ce as chandelierExit };
