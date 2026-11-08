// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { lag } from '../../helper/window';
import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of TSI parameters.
 */
export interface TSIConfig {
  firstPeriod?: number;
  secondPeriod?: number;
}

/**
 * The default configuration of TSI.
 */
export const TSIDefaultConfig: Required<TSIConfig> = {
  firstPeriod: 25,
  secondPeriod: 13,
};

/**
 * True Strength Index (TSI). It is the ratio of the double-smoothed price
 * change to the double-smoothed absolute price change, on a -100 to 100
 * scale.
 *
 * ```
 * PC = Close - Previous Close
 * PCDS = EMA(EMA(PC, firstPeriod), secondPeriod)
 * APCDS = EMA(EMA(Abs(PC), firstPeriod), secondPeriod)
 * TSI = (PCDS / APCDS) * 100
 * ```
 *
 * Each EMA starts from the simple moving average of its first values. When
 * the price has not changed at all, APCDS is 0 and TSI is 0.
 *
 * Warm-up: the first `firstPeriod + secondPeriod - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { tsi } from 'indicatorts';
 *
 * const defaultConfig = { firstPeriod: 25, secondPeriod: 13 };
 * const result = tsi(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = trueStrengthIndex(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return tsi values.
 */
export function tsi(closings: number[], config: TSIConfig = {}): number[] {
  const { firstPeriod, secondPeriod } = { ...TSIDefaultConfig, ...config };
  const previous = lag(closings, 1);
  const changes = closings.map((closing, i) => closing - previous[i]);

  /**
   * Smooths the values with the two EMAs.
   *
   * @param values values to smooth.
   * @return smoothed values.
   */
  const smooth = (values: number[]): number[] =>
    ema(ema(values, { period: firstPeriod, seed: 'sma' }), {
      period: secondPeriod,
      seed: 'sma',
    });

  const pcds = smooth(changes);
  const apcds = smooth(changes.map(Math.abs));

  return pcds.map((pcd, i) => (apcds[i] === 0 ? 0 : (pcd / apcds[i]) * 100));
}

// Export full name
export { tsi as trueStrengthIndex };
