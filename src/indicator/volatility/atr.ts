// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {checkSameLength, max, substract} from '../../helper/numArray';
import {sma} from '../../indicator/trend/sma';

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
 * @param {number} period window period.
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {AtrResult} atr result.const ATR_PERIOD = 14;

 */
export function atr(
    period: number,
    highs: number[],
    lows: number[],
    closings: number[],
): AtrResult {
  checkSameLength(highs, lows, closings);

  const trLine = max(
      substract(highs, lows),
      substract(highs, closings),
      substract(closings, lows),
  );

  const atrLine = sma(period, trLine);

  return {
    trLine,
    atrLine,
  };
}
