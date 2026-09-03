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
 * Force Index = EMA(period, (Current - Previous) * Volume)
 *
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
