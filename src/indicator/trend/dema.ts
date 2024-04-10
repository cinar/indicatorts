// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { multiplyBy, subtract } from '../../helper/numArray';
import { ema } from './ema';

/**
 * Optional configuration of Dema parameters.
 */
export interface DemaConfig {
  period?: number;
}

/**
 * The default configuration of Dema.
 */
export const DemaDefaultConfig: Required<DemaConfig> = {
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
export function dema(values: number[], config: DemaConfig = {}): number[] {
  const { period } = { ...DemaDefaultConfig, ...config };
  const ema1 = ema(values, { period });
  const ema2 = ema(ema1, { period });

  const dema = subtract(multiplyBy(2, ema1), ema2);

  return dema;
}
