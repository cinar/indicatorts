// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { wma } from './weightedMovingAverage';

/**
 * Optional configuration of HMA parameters.
 */
export interface HMAConfig {
  period?: number;
}

/**
 * The default configuration of HMA.
 */
export const HMADefaultConfig: Required<HMAConfig> = {
  period: 20,
};

/**
 * Hull Moving Average (HMA). It combines weighted moving averages of two
 * lengths and smooths their difference with a third, shorter one, which
 * reduces the lag of the average.
 *
 * ```
 * HMA = WMA(2 * WMA(values, round(period / 2)) - WMA(values, period), round(sqrt(period)))
 * ```
 *
 * Warm-up: the first `period - 1 + round(sqrt(period)) - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { hma } from 'indicatorts';
 *
 * const defaultConfig = { period: 20 };
 * const result = hma(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = hullMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return hma values.
 */
export function hma(values: number[], config: HMAConfig = {}): number[] {
  const { period } = { ...HMADefaultConfig, ...config };
  const half = wma(values, { period: Math.round(period / 2) });
  const full = wma(values, { period });
  const difference = half.map((value, i) => 2 * value - full[i]);

  return wma(difference, { period: Math.round(Math.sqrt(period)) });
}

// Export full name
export { hma as hullMovingAverage };
