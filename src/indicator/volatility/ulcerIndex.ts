// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  divide,
  multiply,
  multiplyBy,
  sqrt,
  subtract,
} from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { sma } from '../trend/sma';

/**
 * Optional configuration of UlcerIndex parameters.
 */
export interface UlcerIndexConfig {
  period?: number;
}

/**
 * The default configuration of UlcerIndex.
 */
export const UlcerIndexDefaultConfig: Required<UlcerIndexConfig> = {
  period: 14,
};

/**
 * The Ulcer Index (UI) measures downside risk. The index increases in value
 * as the price moves farther away from a recent high and falls as the price
 * rises to new highs.
 *
 * High Closings = Max(period, Closings)
 * Percentage Drawdown = 100 * ((Closings - High Closings) / High Closings)
 * Squared Average = Sma(period, Percent Drawdown * Percent Drawdown)
 * Ulcer Index = Sqrt(Squared Average)
 *
 * @param closings closing values.
 * @param config configuration.
 * @returns ui values.
 */
export function ulcerIndex(
  closings: number[],
  config: UlcerIndexConfig = {}
): number[] {
  const { period } = { ...UlcerIndexDefaultConfig, ...config };
  const highClosings = mmax(closings, { period });
  const percentageDrawdown = multiplyBy(
    100,
    divide(subtract(closings, highClosings), highClosings)
  );
  const squaredAverage = sma(multiply(percentageDrawdown, percentageDrawdown), {
    period,
  });
  const ui = sqrt(squaredAverage);

  return ui;
}
