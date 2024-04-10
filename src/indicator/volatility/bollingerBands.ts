// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { sma } from '../trend/sma';
import { mstd } from './mstd';

/**
 * Bollinger bands result object.
 */
export interface BBResult {
  upperBand: number[];
  middleBand: number[];
  lowerBand: number[];
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
  const middleBand = sma(closings, { period });
  const upperBand = add(middleBand, std2);
  const lowerBand = subtract(middleBand, std2);

  return {
    upperBand,
    middleBand,
    lowerBand,
  };
}

// Export full name
export { bb as bollingerBands };
