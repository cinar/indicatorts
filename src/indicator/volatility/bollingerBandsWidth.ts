// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';
import { BollingerBands } from './bollingerBands';

const PERIOD = 90;

/**
 * Bollinger bands width result.
 */
export interface BollingerBandsWidth {
  bandWidth: number[];
  bandWidthEma90: number[];
}

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
 * @return bollinger bands width result.
 */
export function bollingerBandsWidth(bb: BollingerBands): BollingerBandsWidth {
  const bandWidth = divide(
    subtract(bb.upperBand, bb.lowerBand),
    bb.middleBand
  );

  const bandWidthEma90 = ema(PERIOD, bandWidth);

  return {
    bandWidth,
    bandWidthEma90,
  };
}
