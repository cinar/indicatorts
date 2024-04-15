// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { tr } from './trueRange';
import { sma } from '../trend/simpleMovingAverage';

/**
 * Average true range result.
 */
export interface ATRResult {
  trLine: number[];
  atrLine: number[];
}

/**
 * Optional configuration of ATR parameters.
 */
export interface ATRConfig {
  period?: number;
}

/**
 * The default configuration of ATR.
 */
export const ATRDefaultConfig: Required<ATRConfig> = {
  period: 14,
};

/**
 * Average True Range (ATR). It is a technical analysis indicator that
 * measures market volatility by decomposing the entire range of stock
 * prices for that period.
 *
 * TR = Max((High - Low), (High - Closing), (Closing - Low))
 * ATR = SMA TR
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return atr tr line and atr line.
 */
export function atr(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ATRConfig = {}
): ATRResult {
  const { period } = { ...ATRDefaultConfig, ...config };
  const trLine = tr(highs, lows, closings);
  const atrLine = sma(trLine, { period });

  return {
    trLine,
    atrLine,
  };
}

// Export full name
export { atr as averageTrueRange };
