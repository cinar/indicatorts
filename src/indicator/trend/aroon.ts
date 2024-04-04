// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  addBy,
  checkSameLength,
  divideBy,
  multiplyBy,
} from '../../helper/numArray';
import { since } from './since';
import { mmin } from './mmin';
import { mmax } from './mmax';

/**
 * Aroon period.
 */
const AROON_PERIOD = 25;

/**
 * Aroon result.
 */
export interface AroonResult {
  up: number[];
  down: number[];
}

/**
 * Aroon Indicator. It is a technical indicator that is used to identify trend changes
 * in the price of a stock, as well as the strength of that trend. It consists of two
 * lines, Arron Up, and Aroon Down. The Aroon Up line measures the strength of the
 * uptrend, and the Aroon Down measures the strength of the downtrend. When Aroon Up
 * is above Aroon Down, it indicates bullish price, and when Aroon Down is above
 * Aroon Up, it indicates bearish price.
 *
 * Aroon Up = ((25 - Period Since Last 25 Period High) / 25) * 100
 * Aroon Down = ((25 - Period Since Last 25 Period Low) / 25) * 100
 *
 * @param highs highs values.
 * @param lows lows values.
 * @return aroon result.
 */
export function aroon(highs: number[], lows: number[]): AroonResult {
  checkSameLength(highs, lows);

  const sinceLastHigh = since(mmax(highs, { period: AROON_PERIOD }));
  const sinceLastLow = since(mmin(lows, { period: AROON_PERIOD }));

  const up = multiplyBy(
    100,
    divideBy(AROON_PERIOD, addBy(AROON_PERIOD, multiplyBy(-1, sinceLastHigh)))
  );

  const down = multiplyBy(
    100,
    divideBy(AROON_PERIOD, addBy(AROON_PERIOD, multiplyBy(-1, sinceLastLow)))
  );

  return {
    up,
    down,
  };
}
