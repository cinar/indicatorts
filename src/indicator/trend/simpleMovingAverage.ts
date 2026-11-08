// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { msum } from './movingSum';

/**
 * Optional configuration of SMA parameters.
 */
export interface SMAConfig {
  period?: number;
}

/**
 * The default configuration of SMA.
 */
export const SMADefaultConfig: Required<SMAConfig> = {
  period: 2,
};

/**
 * Simple moving average (SMA). Until a full period is available, the
 * average is taken over the values seen so far.
 *
 * Built on msum, so a window of zeros averages to exactly 0, and a NaN or
 * Infinity input only affects the windows that contain it.
 *
 * @title Simple Moving Average (SMA)
 * @example
 * ```TypeScript
 * import { sma } from 'indicatorts';
 *
 * const defaultConfig = { period: 2 };
 * const result = sma(values);
 *
 * // Alternatively:
 * // const result = simpleMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return SMA values.
 */
export function sma(values: number[], config: SMAConfig = {}): number[] {
  const { period } = { ...SMADefaultConfig, ...config };
  const sums = msum(values, { period });

  return sums.map((sum, i) => sum / Math.min(i + 1, period));
}

// Export full name
export { sma as simpleMovingAverage };
