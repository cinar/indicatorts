// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  addBy,
  checkSameLength,
  divideBy,
  multiplyBy,
} from '../../helper/numArray';
import { since } from './since';
import { mmin } from './movingMin';
import { mmax } from './movingMax';

/**
 * Aroon result.
 */
export interface AroonResult {
  up: number[];
  down: number[];
}

/**
 * Optional configuration of Aroon parameters.
 */
export interface AroonConfig {
  period?: number;
}

/**
 * The default configuration of Aroon.
 */
export const AroonDefaultConfig: Required<AroonConfig> = {
  period: 25,
};

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
 * @param config configuration.
 * @return aroon result.
 */
export function aroon(
  highs: number[],
  lows: number[],
  config: AroonConfig = {}
): AroonResult {
  checkSameLength(highs, lows);

  const { period } = { ...AroonDefaultConfig, ...config };

  const sinceLastHigh = since(mmax(highs, { period }));
  const sinceLastLow = since(mmin(lows, { period }));

  const up = multiplyBy(
    100,
    divideBy(period, addBy(period, multiplyBy(-1, sinceLastHigh)))
  );

  const down = multiplyBy(
    100,
    divideBy(period, addBy(period, multiplyBy(-1, sinceLastLow)))
  );

  return {
    up,
    down,
  };
}
