// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { tr } from './tr';
import { sma } from '../../indicator/trend/sma';

/**
 * ATR result.
 */
export interface AtrResult {
  trLine: number[];
  atrLine: number[];
}

/**
 * Average True Range (ATR). It is a technical analysis indicator that
 * measures market volatility by decomposing the entire range of stock
 * prices for that period.
 *
 * TR = Max((High - Low), (High - Closing), (Closing - Low))
 * ATR = SMA TR
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return atr result.const ATR_PERIOD = 14;
 */
export function atr(
  period: number,
  highs: number[],
  lows: number[],
  closings: number[]
): AtrResult {
  const trLine = tr(period, highs, lows, closings);
  const atrLine = sma(trLine, { period });

  return {
    trLine,
    atrLine,
  };
}
