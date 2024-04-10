// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  divide,
  multiply,
  multiplyBy,
  sqrt,
  subtract,
} from '../../helper/numArray';
import { mmax } from '../trend/movingMax';
import { sma } from '../trend/simpleMovingAverage';

/**
 * Optional configuration of UI parameters.
 */
export interface UIConfig {
  period?: number;
}

/**
 * The default configuration of UI.
 */
export const UIDefaultConfig: Required<UIConfig> = {
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
export function ui(closings: number[], config: UIConfig = {}): number[] {
  const { period } = { ...UIDefaultConfig, ...config };
  const highClosings = mmax(closings, { period });
  const percentageDrawdown = multiplyBy(
    100,
    divide(subtract(closings, highClosings), highClosings)
  );
  const squaredAverage = sma(multiply(percentageDrawdown, percentageDrawdown), {
    period,
  });
  const result = sqrt(squaredAverage);

  return result;
}

// Export full name
export { ui as ulcerIndex };
