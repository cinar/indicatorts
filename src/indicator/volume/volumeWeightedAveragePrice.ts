// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply } from '../../helper/numArray';
import { msum } from '../trend/movingSum';

/**
 * Optional configuration of VWAP parameters.
 */
export interface VWAPConfig {
  period?: number;
}

/**
 * The default configuration of VWAP.
 */
export const VWAPDefaultConfig: Required<VWAPConfig> = {
  period: 14,
};

/**
 * The Volume Weighted Average Price (VWAP) provides the average price
 * the asset has traded.
 *
 * VWAP = Sum(Closing * Volume) / Sum(Volume)
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @returns vwap values.
 */
export function vwap(
  closings: number[],
  volumes: number[],
  config: VWAPConfig = {}
): number[] {
  const { period } = { ...VWAPDefaultConfig, ...config };
  const volumeSum = msum(volumes, { period });
  const resultRaw = divide(msum(multiply(closings, volumes), { period }), volumeSum);

  // When the volume sum for a window is 0 (no trading volume), VWAP is
  // treated as 0 instead of NaN (0 / 0).
  const result = resultRaw.map((value, i) => (volumeSum[i] === 0 ? 0 : value));

  return result;
}

// Export full name
export { vwap as volumeWeightedAveragePrice };
