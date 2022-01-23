// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, shiftRightAndFillBy, substract } from '../../helper/numArray';
import { ema } from './ema';

/**
 * Triple Exponential Average (TRIX) indicator is an oscillator used to
 * identify oversold and overbought markets, and it can also be used
 * as a momentum indicator. Like many oscillators, TRIX oscillates
 * around a zero line.
 *
 * EMA1 = EMA(period, values)
 * EMA2 = EMA(period, EMA1)
 * EMA3 = EMA(period, EMA2)
 * TRIX = (EMA3 - Previous EMA3) / Previous EMA3
 *
 * @param period window period.
 * @param values values array.
 * @returns trix values.
 */
export function trix(period: number, values: number[]): number[] {
  const ema1 = ema(period, values);
  const ema2 = ema(period, ema1);
  const ema3 = ema(period, ema2);
  const previous = shiftRightAndFillBy(1, ema3[0], ema3);
  const trix = divide(substract(ema3, previous), previous);
  return trix;
}
