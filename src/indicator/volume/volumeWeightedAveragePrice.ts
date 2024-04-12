// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
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
  const result = divide(
    msum(multiply(closings, volumes), { period }),
    msum(volumes, { period })
  );

  return result;
}

// Export full name
export { vwap as volumeWeightedAveragePrice };
