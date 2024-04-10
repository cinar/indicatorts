// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply } from '../../helper/numArray';
import { msum } from '../trend/msum';

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
  return divide(
    msum(multiply(closings, volumes), { period }),
    msum(volumes, { period })
  );
}

// Export full name
export { vwap as volumeWeightedAveragePrice };
