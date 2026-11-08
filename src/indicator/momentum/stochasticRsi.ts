// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { windowedMax, windowedMin } from '../../helper/window';
import { rsi } from './relativeStrengthIndex';

/**
 * Optional configuration of Stochastic RSI parameters.
 */
export interface StochRSIConfig {
  period?: number;
}

/**
 * The default configuration of Stochastic RSI.
 */
export const StochRSIDefaultConfig: Required<StochRSIConfig> = {
  period: 14,
};

/**
 * Stochastic Relative Strength Index (StochRSI). It places the RSI within
 * the range of its last `period` values, on a 0 to 1 scale.
 *
 * ```
 * StochRSI = (RSI - Min(RSI, period)) / (Max(RSI, period) - Min(RSI, period))
 * ```
 *
 * The RSI uses the same period and starts from a simple moving average
 * (`seed: 'sma'`). A window whose RSI values are all equal has no range,
 * and its value is NaN.
 *
 * Warm-up: the first `2 * period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { stochRsi } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = stochRsi(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = stochasticRsi(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return stochastic rsi values.
 */
export function stochRsi(
  closings: number[],
  config: StochRSIConfig = {}
): number[] {
  const { period } = { ...StochRSIDefaultConfig, ...config };
  const rsis = rsi(closings, { period, seed: 'sma' });
  const highest = windowedMax(rsis, period);
  const lowest = windowedMin(rsis, period);

  return rsis.map((value, i) => (value - lowest[i]) / (highest[i] - lowest[i]));
}

// Export full name
export { stochRsi as stochasticRsi };
