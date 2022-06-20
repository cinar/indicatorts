// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { multiplyBy, subtract } from '../../helper/numArray';
import { ema } from './ema';

/**
 * Dema calculates the Double Exponential Moving Average (DEMA).
 *
 * DEMA = (2 * EMA(values)) - EMA(EMA(values))
 *
 * @param period window period.
 * @param values values array.
 * @return dema values.
 */
export function dema(period: number, values: number[]): number[] {
  const ema1 = ema(period, values);
  const ema2 = ema(period, ema1);

  const dema = subtract(multiplyBy(2, ema1), ema2);

  return dema;
}
