// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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
  const volumeSum = msum(volumes, { period });
  const resultRaw = divide(msum(multiply(closings, volumes), { period }), volumeSum);

  // When the volume sum for a window is 0 (no trading volume), VWMA is
  // treated as 0 instead of NaN (0 / 0).
  const result = resultRaw.map((value, i) => (volumeSum[i] === 0 ? 0 : value));

  return result;
}

// Export full name
export { vwma as volumeWeightedMovingAverage };
