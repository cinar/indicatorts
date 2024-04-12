// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  addBy,
  checkSameLength,
  divide,
  multiply,
  multiplyBy,
  subtract,
} from '../../helper/numArray';
import { sma } from '../trend/simpleMovingAverage';

/**
 * Acceleration bands result object.
 */
export interface ABResult {
  upper: number[];
  middle: number[];
  lower: number[];
}

/**
 * Optional configuration of acceleration bands parameters.
 */
export interface ABConfig {
  period?: number;
  multiplier?: number;
}

/**
 * The default configuration of acceleration bands.
 */
export const ABDefaultConfig: Required<ABConfig> = {
  period: 20,
  multiplier: 4,
};

/**
 * Acceleration Bands. Plots upper and lower envelope bands
 * around a simple moving average.
 *
 * Upper Band = SMA(High * (1 + 4 * (High - Low) / (High + Low)))
 * Middle Band = SMA(Closing)
 * Lower Band = SMA(Low * (1 - 4 * (High - Low) / (High + Low)))
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return acceleration band.
 */
export function ab(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ABConfig = {}
): ABResult {
  checkSameLength(highs, lows, closings);

  const { period, multiplier } = { ...ABDefaultConfig, ...config };
  const k = divide(subtract(highs, lows), add(highs, lows));

  const upper = sma(multiply(highs, addBy(1, multiplyBy(multiplier, k))), {
    period,
  });
  const middle = sma(closings, { period });
  const lower = sma(multiply(lows, addBy(1, multiplyBy(-1 * multiplier, k))), {
    period,
  });

  return {
    upper,
    middle,
    lower,
  };
}

// Export full name
export { ab as accelerationBands };
