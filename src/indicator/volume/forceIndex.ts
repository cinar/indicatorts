// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { changes, multiply } from '../../helper/numArray';
import { ema } from '../trend/ema';

/**
 * The Force Index (FI) uses the closing price and the volume to assess
 * the power behind a move and identify turning points.
 *
 * Force Index = EMA(period, (Current - Previous) * Volume)
 *
 * @param period window period.
 * @param closings closing values.
 * @param volumes volume values.
 * @return force index.
 */
export function forceIndex(
  period: number,
  closings: number[],
  volumes: number[]
): number[] {
  return ema(multiply(changes(1, closings), volumes), { period });
}

/**
 * The default Force Index (FI) with window size of 13.
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @return force index.
 */
export function defaultForceIndex(
  closings: number[],
  volumes: number[]
): number[] {
  return forceIndex(13, closings, volumes);
}
