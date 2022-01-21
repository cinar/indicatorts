// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply } from '../../helper/numArray';
import { msum } from '../trend/msum';

/**
 * Default period for VWAP.
 */
export const VWAP_DEFAULT_PERIOD = 14;

/**
 * The Volume Weighted Average Price (VWAP) provides the average price
 * the asset has traded.
 *
 * VWAP = Sum(Closing * Volume) / Sum(Volume)
 *
 * @param period window period.
 * @param closings closing values.
 * @param volumes volume values.
 * @returns vwap values.
 */
export function volumeWeightedAveragePrice(
  period: number,
  closings: number[],
  volumes: number[]
): number[] {
  return divide(
    msum(period, multiply(closings, volumes)),
    msum(period, volumes)
  );
}

/**
 * Default volume weighted average price with period of 14.
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @returns vwap values.
 */
export function defaultVolumeWeightedAveragePrice(
  closings: number[],
  volumes: number[]
): number[] {
  return volumeWeightedAveragePrice(VWAP_DEFAULT_PERIOD, closings, volumes);
}
