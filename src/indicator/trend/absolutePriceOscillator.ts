// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of APO parameters.
 */
export interface APOConfig {
  fast?: number;
  slow?: number;
}

/**
 * The default configuration of APO.
 */
export const APODefaultConfig: Required<APOConfig> = {
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
export function apo(values: number[], config: APOConfig = {}): number[] {
  const { fast: fastPeriod, slow: slowPeriod } = {
    ...APODefaultConfig,
    ...config,
  };
  const fast = ema(values, { period: fastPeriod });
  const slow = ema(values, { period: slowPeriod });
  const result = subtract(fast, slow);

  return result;
}

// Export full name
export { apo as absolutePriceOscillator };
