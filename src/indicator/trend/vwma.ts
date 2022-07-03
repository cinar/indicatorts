// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply } from '../../helper/numArray';
import { msum } from './msum';

/** Default VWMA period value. */
export const DEFAULT_VWMA_PERIOD = 20;

/**
 * The vwma function calculates the Volume Weighted Moving Average (VWMA)
 * averaging the price data with an emphasis on volume, meaning areas
 * with higher volume will have a greater weight.
 *
 * VWMA = Sum(Price * Volume) / Sum(Volume) for a given Period.
 *
 * @param period period value.
 * @param closings asset closings.
 * @param volumes asset volumes.
 * @returns vwma values.
 */
export function vwma(
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
 * The defaultVwma function calculates VWMA with a period of 20.
 *
 * @param closings asset closings.
 * @param volumes asset volumes.
 * @returns vwma values.
 */
export function defaultVwma(closings: number[], volumes: number[]): number[] {
  return vwma(DEFAULT_VWMA_PERIOD, closings, volumes);
}
