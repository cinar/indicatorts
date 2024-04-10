// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply } from '../../helper/numArray';
import { msum } from '../trend/msum';

/**
 * Default period for VWAP.
 */
export const VWAP_DEFAULT_PERIOD = 14;

/**
 * Optional configuration of VolumeWeightedAveragePrice parameters.
 */
export interface VolumeWeightedAveragePriceConfig {
  period?: number;
}

/**
 * The default configuration of VolumeWeightedAveragePrice.
 */
export const VolumeWeightedAveragePriceDefaultConfig: Required<VolumeWeightedAveragePriceConfig> =
  {
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
export function volumeWeightedAveragePrice(
  closings: number[],
  volumes: number[],
  config: VolumeWeightedAveragePriceConfig = {}
): number[] {
  const { period } = { ...VolumeWeightedAveragePriceDefaultConfig, ...config };
  return divide(
    msum(multiply(closings, volumes), { period }),
    msum(volumes, { period })
  );
}
