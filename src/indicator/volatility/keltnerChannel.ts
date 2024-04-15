// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';
import { atr } from './averageTrueRange';

/**
 * Keltner channel result object.
 */
export interface KCResult {
  upper: number[];
  middle: number[];
  lower: number[];
}

/**
 * Optional configuration of KC parameters.
 */
export interface KCConfig {
  period?: number;
}

/**
 * The default configuration of KC.
 */
export const KCDefaultConfig: Required<KCConfig> = {
  period: 20,
};

/**
 * The Keltner Channel (KC) provides volatility-based bands that are placed
 * on either side of an asset's price and can aid in determining the
 * direction of a trend.
 *
 * Middle Line = EMA(period, closings)
 * Upper Band = EMA(period, closings) + 2 * ATR(period, highs, lows, closings)
 * Lower Band = EMA(period, closings) - 2 * ATR(period, highs, lows, closings)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @returns kc result.
 */
export function kc(
  highs: number[],
  lows: number[],
  closings: number[],
  config: KCConfig = {}
): KCResult {
  const { period } = { ...KCDefaultConfig, ...config };
  const atrResult = atr(highs, lows, closings, { period });
  const atr2 = multiplyBy(2, atrResult.atrLine);

  const middle = ema(closings, { period });
  const upper = add(middle, atr2);
  const lower = subtract(middle, atr2);

  return {
    middle,
    upper,
    lower,
  };
}

// Export full name
export { kc as keltnerChannel };
