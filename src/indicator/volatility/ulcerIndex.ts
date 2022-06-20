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
 * Default period for UI.
 */
export const UI_DEFAULT_PERIOD = 14;

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
 * @param period window period.
 * @param closings closing values.
 * @returns ui values.
 */
export function ulcerIndex(period: number, closings: number[]): number[] {
  const highClosings = mmax(period, closings);
  const percentageDrawdown = multiplyBy(
    100,
    divide(subtract(closings, highClosings), highClosings)
  );
  const squaredAverage = sma(
    period,
    multiply(percentageDrawdown, percentageDrawdown)
  );
  const ui = sqrt(squaredAverage);

  return ui;
}

/**
 * The default ulcer index with the default period of 14.
 *
 * @param closings closing values.
 * @returns ui values.
 */
export function defaultUlcerIndex(closings: number[]): number[] {
  return ulcerIndex(UI_DEFAULT_PERIOD, closings);
}
