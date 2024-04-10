// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from './ema';

/**
 * Optional configuration of AbsolutePriceOscillator parameters.
 */
export interface AbsolutePriceOscillatorConfig {
  fast?: number;
  slow?: number;
}

/**
 * The default configuration of AbsolutePriceOscillator.
 */
export const AbsolutePriceOscillatorDefaultConfig: Required<AbsolutePriceOscillatorConfig> =
  {
    fast: 14,
    slow: 30,
  };

/**
 * Absolute Price Oscillator (APO) function calculates the technical indicator
 * that is used to follow trends. APO crossing above zero indicates bullish,
 * while crossing below zero indicates bearish. Positive value is upward
 * trend, while negative value is downward trend.
 *
 * Fast = EMA(fastPeriod, values)
 * Slow = EMA(slowPeriod, values)
 * APO = Fast - Slow
 *
 * @param values values array.
 * @param config configuration.
 * @return apo array.
 */
export function absolutePriceOscillator(
  values: number[],
  config: AbsolutePriceOscillatorConfig = {}
): number[] {
  const { fast: fastPeriod, slow: slowPeriod } = {
    ...AbsolutePriceOscillatorDefaultConfig,
    ...config,
  };
  const fast = ema(fastPeriod, values);
  const slow = ema(slowPeriod, values);
  const apo = subtract(fast, slow);
  return apo;
}
