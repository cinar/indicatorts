// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';

/**
 * Elder-Ray result object.
 */
export interface ElderRayResult {
  bullPower: number[];
  bearPower: number[];
}

/**
 * Optional configuration of Elder-Ray parameters.
 */
export interface ElderRayConfig {
  period?: number;
}

/**
 * The default configuration of Elder-Ray.
 */
export const ElderRayDefaultConfig: Required<ElderRayConfig> = {
  period: 13,
};

/**
 * Elder-Ray Index. It measures how far the high and the low are from an
 * exponential moving average of the closings. Alexander Elder named the
 * two outputs Bull Power and Bear Power.
 *
 * ```
 * Bull Power = High - EMA(closings, period)
 * Bear Power = Low - EMA(closings, period)
 * ```
 *
 * The EMA starts from the simple moving average of the first `period`
 * closings.
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { elderRay } from 'indicatorts';
 *
 * const defaultConfig = { period: 13 };
 * const { bullPower, bearPower } = elderRay(highs, lows, closings, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return elder-ray result.
 */
export function elderRay(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ElderRayConfig = {}
): ElderRayResult {
  checkSameLength(highs, lows, closings);

  const { period } = { ...ElderRayDefaultConfig, ...config };
  const average = ema(closings, { period, seed: 'sma' });

  return {
    bullPower: highs.map((high, i) => high - average[i]),
    bearPower: lows.map((low, i) => low - average[i]),
  };
}
