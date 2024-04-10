// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';
import { atr } from './atr';

/**
 * Default period for KC.
 */
export const KC_PERIOD = 20;

/**
 * Keltner channel result object.
 */
export interface KeltnerChannelResult {
  middleLine: number[];
  upperBand: number[];
  lowerBand: number[];
}

/**
 * Optional configuration of KeltnerChannel parameters.
 */
export interface KeltnerChannelConfig {
  period?: number;
}

/**
 * The default configuration of KeltnerChannel.
 */
export const KeltnerChannelDefaultConfig: Required<KeltnerChannelConfig> = {
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
export function keltnerChannel(
  highs: number[],
  lows: number[],
  closings: number[],
  config: KeltnerChannelConfig = {}
): KeltnerChannelResult {
  const { period } = { ...KeltnerChannelDefaultConfig, ...config };
  const atrResult = atr(highs, lows, closings, { period });
  const atr2 = multiplyBy(2, atrResult.atrLine);

  const middleLine = ema(closings, { period });
  const upperBand = add(middleLine, atr2);
  const lowerBand = subtract(middleLine, atr2);

  return {
    middleLine,
    upperBand,
    lowerBand,
  };
}
