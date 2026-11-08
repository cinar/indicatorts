// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { multiplyBy, subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of DEMA parameters.
 */
export interface DEMAConfig {
  period?: number;
}

/**
 * The default configuration of DEMA.
 */
export const DEMADefaultConfig: Required<DEMAConfig> = {
  period: 12,
};

/**
 * Dema calculates the Double Exponential Moving Average (DEMA).
 *
 * ```
 * DEMA = (2 * EMA(values)) - EMA(EMA(values))
 * ```
 *
 * Based on [Double Exponential Moving Average (DEMA)](https://www.investopedia.com/terms/d/double-exponential-moving-average.asp).
 *
 * @title Double Exponential Moving Average (DEMA)
 * @example
 * ```TypeScript
 * import { dema } from 'indicatorts';
 *
 * const defaultConfig = { period: 12 };
 * const result = dema(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = doubleExponentialMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration
 * @return dema values.
 */
export function dema(values: number[], config: DEMAConfig = {}): number[] {
  const { period } = { ...DEMADefaultConfig, ...config };
  const ema1 = ema(values, { period });
  const ema2 = ema(ema1, { period });

  const result = subtract(multiplyBy(2, ema1), ema2);

  return result;
}

// Export full name
export { dema as doubleExponentialMovingAverage };
