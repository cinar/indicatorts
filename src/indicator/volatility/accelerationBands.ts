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
import { sma } from '../trend/sma';

/**
 * Acceleration bands result object.
 */
export interface AccelerationBandsResult {
  upperBand: number[];
  middleBand: number[];
  lowerBand: number[];
}

/**
 * Optional configuration of acceleration bands parameters.
 */
export interface AccelerationBandsConfig {
  period?: number;
}

/**
 * The default configuration of acceleration bands.
 */
export const AccelerationBandsDefaultConfig: Required<AccelerationBandsConfig> =
  {
    period: 20,
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
  config: AccelerationBandsConfig = {}
): AccelerationBandsResult {
  checkSameLength(highs, lows, closings);

  const { period } = { ...AccelerationBandsDefaultConfig, ...config };
  const k = divide(subtract(highs, lows), add(highs, lows));

  const upperBand = sma(multiply(highs, addBy(1, multiplyBy(4, k))), {
    period,
  });
  const middleBand = sma(closings, { period: 20 });
  const lowerBand = sma(multiply(lows, addBy(1, multiplyBy(-4, k))), {
    period,
  });

  return {
    upperBand,
    middleBand,
    lowerBand,
  };
}

// Export full name
export { ab as accelerationBands };
