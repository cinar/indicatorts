// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';
import { BBResult } from './bollingerBands';

/**
 * Bollinger bands width result.
 */
export interface BBWResult {
  bandWidth: number[];
  bandWidthEma: number[];
}

/**
 * Optional configuration of Bollinger bands width parameters.
 */
export interface BBWConfig {
  period?: number;
}

/**
 * The default configuration of Bollinger bands width.
 */
export const BBWDefaultConfig: Required<BBWConfig> = {
  period: 90,
};

/**
 * Bollinger Band Width. It measures the percentage difference between the
 * upper band and the lower band. It decreases as Bollinger Bands narrows
 * and increases as Bollinger Bands widens
 *
 * During a period of rising price volatity the band width widens, and
 * during a period of low market volatity band width contracts.
 *
 * Band Width = (Upper Band - Lower Band) / Middle Band
 *
 * @param bb bollinger bands.
 * @param config configuration.
 * @return bollinger bands width result.
 */
export function bbw(bb: BBResult, config: BBWConfig = {}): BBWResult {
  const { period } = { ...BBWDefaultConfig, ...config };
  const bandWidth = divide(subtract(bb.upperBand, bb.lowerBand), bb.middleBand);

  const bandWidthEma = ema(bandWidth, { period });

  return {
    bandWidth,
    bandWidthEma,
  };
}

// Export full name
export { bbw as bollingerBandsWidth };
