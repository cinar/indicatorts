// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
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
 * DEMA = (2 * EMA(values)) - EMA(EMA(values))
 *
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
