// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { windowed } from '../../helper/window';

/**
 * Optional configuration of WMA parameters.
 */
export interface WMAConfig {
  period?: number;
}

/**
 * The default configuration of WMA.
 */
export const WMADefaultConfig: Required<WMAConfig> = {
  period: 20,
};

/**
 * Weighted Moving Average (WMA). It averages the last `period` values with
 * linearly increasing weights, so the newest value has the weight `period`
 * and the oldest has the weight 1.
 *
 * ```
 * WMA = (1 * V[i-period+1] + 2 * V[i-period+2] + ... + period * V[i]) / (period * (period + 1) / 2)
 * ```
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { wma } from 'indicatorts';
 *
 * const defaultConfig = { period: 20 };
 * const result = wma(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = weightedMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return wma values.
 */
export function wma(values: number[], config: WMAConfig = {}): number[] {
  const { period } = { ...WMADefaultConfig, ...config };
  const divisor = (period * (period + 1)) / 2;

  return windowed(
    values,
    period,
    (window) =>
      window.reduce((sum, value, i) => sum + value * (i + 1), 0) / divisor
  );
}

// Export full name
export { wma as weightedMovingAverage };
