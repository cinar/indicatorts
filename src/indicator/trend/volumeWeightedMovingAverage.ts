// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply } from '../../helper/numArray';
import { msum } from './movingSum';

/**
 * Optional configuration of VWMA parameters.
 */
export interface VWMAConfig {
  period?: number;
}

/**
 * The default configuration of VWMA.
 */
export const VWMADefaultConfig: Required<VWMAConfig> = {
  period: 20,
};

/**
 * The vwma function calculates the Volume Weighted Moving Average (VWMA)
 * averaging the price data with an emphasis on volume, meaning areas
 * with higher volume will have a greater weight.
 *
 * VWMA = Sum(Price * Volume) / Sum(Volume) for a given Period.
 *
 * @param closings asset closings.
 * @param volumes asset volumes.
 * @param config configuration.
 * @returns vwma values.
 */
export function vwma(
  closings: number[],
  volumes: number[],
  config: VWMAConfig = {}
): number[] {
  const { period } = { ...VWMADefaultConfig, ...config };
  const result = divide(
    msum(multiply(closings, volumes), { period }),
    msum(volumes, { period })
  );

  return result;
}

// Export full name
export { vwma as volumeWeightedMovingAverage };
