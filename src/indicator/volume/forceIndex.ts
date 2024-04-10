// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { changes, multiply } from '../../helper/numArray';
import { ema } from '../trend/ema';

/**
 * Optional configuration of ForeIndex parameters.
 */
export interface ForeIndexConfig {
  period?: number;
}

/**
 * The default configuration of ForeIndex.
 */
export const ForeIndexDefaultConfig: Required<ForeIndexConfig> = {
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
export function forceIndex(
  closings: number[],
  volumes: number[],
  config: ForeIndexConfig = {}
): number[] {
  const { period } = { ...ForeIndexDefaultConfig, ...config };
  return ema(multiply(changes(1, closings), volumes), { period });
}
