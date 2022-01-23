// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, substract } from '../../helper/numArray';
import { ema } from './ema';

/**
 * Tema calculates the Triple Exponential Moving Average (TEMA).
 *
 * TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
 * EMA1 = EMA(values)
 * EMA2 = EMA(EMA1)
 * EMA3 = EMA(EMA2)
 *
 * @param period window period.
 * @param values values array.
 * @return tema values.
 */
export function tema(period: number, values: number[]): number[] {
  const ema1 = ema(period, values);
  const ema2 = ema(period, ema1);
  const ema3 = ema(period, ema2);

  const temaLine = add(
    substract(multiplyBy(3, ema1), multiplyBy(3, ema2)),
    ema3
  );

  return temaLine;
}
