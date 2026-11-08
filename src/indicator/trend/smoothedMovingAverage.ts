// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { rma } from './rollingMovingAverage';

/**
 * Optional configuration of SMMA parameters.
 */
export interface SMMAConfig {
  period?: number;
}

/**
 * The default configuration of SMMA.
 */
export const SMMADefaultConfig: Required<SMMAConfig> = {
  period: 7,
};

/**
 * Smoothed Moving Average (SMMA). It starts from the simple moving average
 * of the first `period` values and then gives each new value a weight of
 * `1 / period`. It is the rolling moving average (RMA) with an SMA seed.
 *
 * ```
 * SMMA[period - 1] = SMA(values[0..period-1])
 * SMMA[i] = (SMMA[i-1] * (period - 1) + V[i]) / period
 * ```
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { smma } from 'indicatorts';
 *
 * const defaultConfig = { period: 7 };
 * const result = smma(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = smoothedMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return smma values.
 */
export function smma(values: number[], config: SMMAConfig = {}): number[] {
  const { period } = { ...SMMADefaultConfig, ...config };
  return rma(values, { period, seed: 'sma' });
}

// Export full name
export { smma as smoothedMovingAverage };
