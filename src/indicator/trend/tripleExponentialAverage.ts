// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, shiftRightAndFillBy, subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of TRIX parameters.
 */
export interface TRIXConfig {
  period?: number;
}

/**
 * The default configuration of TRIX.
 */
export const TRIXDefaultConfig: Required<TRIXConfig> = {
  period: 4,
};

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
 * @param values values array.
 * @param config configuration.
 * @returns trix values.
 */
export function trix(values: number[], config: TRIXConfig = {}): number[] {
  const { period } = { ...TRIXDefaultConfig, ...config };
  const ema1 = ema(values, { period });
  const ema2 = ema(ema1, { period });
  const ema3 = ema(ema2, { period });
  const previous = shiftRightAndFillBy(1, ema3[0], ema3);
  const result = divide(subtract(ema3, previous), previous);

  return result;
}

// Export full name
export { trix as tripleExponentialAverage };
