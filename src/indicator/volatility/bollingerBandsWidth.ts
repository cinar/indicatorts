// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';
import { BollingerBandsResult } from './bollingerBands';

/**
 * Bollinger bands width result.
 */
export interface BollingerBandsWidthResult {
  bandWidth: number[];
  bandWidthEma90: number[];
}

/**
 * Optional configuration of Bollinger bands width parameters.
 */
export interface BollingerBandsWidthConfig {
  period?: number;
}

/**
 * The default configuration of Bollinger bands width.
 */
export const BollingerBandsWidthDefaultConfig: Required<BollingerBandsWidthConfig> =
  {
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
export function bollingerBandsWidth(
  bb: BollingerBandsResult,
  config: BollingerBandsWidthConfig = {}
): BollingerBandsWidthResult {
  const { period } = { ...BollingerBandsWidthDefaultConfig, ...config };
  const bandWidth = divide(subtract(bb.upperBand, bb.lowerBand), bb.middleBand);

  const bandWidthEma90 = ema(bandWidth, { period });

  return {
    bandWidth,
    bandWidthEma90,
  };
}
