// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { multiply, shiftRightAndFillBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';

/**
 * Optional configuration of FI parameters.
 */
export interface FIConfig {
  period?: number;
}

/**
 * The default configuration of FI.
 */
export const FIDefaultConfig: Required<FIConfig> = {
  period: 13,
};

/**
 * The Force Index (FI) uses the closing price and the volume to assess
 * the power behind a move and identify turning points.
 *
 * ```
 * Force Index = EMA(period, (Current - Previous) * Volume)
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @title Force Index (FI)
 * @example
 * ```TypeScript
 * import { fi } from 'indicatorts';
 *
 * const defaultConfig = { period: 13 };
 * const result = fi(closings, volumes, defaultConfig);
 *
 * // Alternatively:
 * // const result = forceIndex(closings, volumes, defaultConfig);
 * ```
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @return force index.
 */
export function fi(
  closings: number[],
  volumes: number[],
  config: FIConfig = {}
): number[] {
  const { period } = { ...FIDefaultConfig, ...config };
  const priceChanges = subtract(
    closings,
    shiftRightAndFillBy(1, closings[0], closings)
  );
  const result = ema(multiply(priceChanges, volumes), { period });

  return result;
}

// Export full name
export { fi as forceIndex };
