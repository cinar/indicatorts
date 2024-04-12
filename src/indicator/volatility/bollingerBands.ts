// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { sma } from '../trend/simpleMovingAverage';
import { mstd } from './movingStandardDeviation';

/**
 * Bollinger bands result object.
 */
export interface BBResult {
  upper: number[];
  middle: number[];
  lower: number[];
}

/**
 * Optional configuration of Bollinger bands parameters.
 */
export interface BBConfig {
  period?: number;
}

/**
 * The default configuration of Bollinger bands.
 */
export const BBDefaultConfig: Required<BBConfig> = {
  period: 20,
};

/**
 * Bollinger Bands.
 *
 * Middle Band = 20-Period SMA.
 * Upper Band = 20-Period SMA + 2 (20-Period Std)
 * Lower Band = 20-Period SMA - 2 (20-Period Std)
 *
 * @param closings closing values.
 * @param config configuration.
 * @return bollinger bands.
 */
export function bb(closings: number[], config: BBConfig = {}): BBResult {
  const { period } = { ...BBDefaultConfig, ...config };
  const std2 = multiplyBy(2, mstd(closings, { period }));
  const middle = sma(closings, { period });
  const upper = add(middle, std2);
  const lower = subtract(middle, std2);

  return {
    upper,
    middle,
    lower,
  };
}

// Export full name
export { bb as bollingerBands };
