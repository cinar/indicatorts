// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, substract } from '../../helper/numArray';
import { sma } from '../trend/sma';
import { mstd } from './mstd';

const BB_PERIOD = 20;

/**
 * Bollinger bands result object.
 */
export interface BollingerBands {
  upperBand: number[];
  middleBand: number[];
  lowerBand: number[];
}

/**
 * Bollinger Bands.
 *
 * Middle Band = 20-Period SMA.
 * Upper Band = 20-Period SMA + 2 (20-Period Std)
 * Lower Band = 20-Period SMA - 2 (20-Period Std)
 *
 * @param closings closing values.
 * @return bollinger bands.
 */
export function bollingerBands(closings: number[]): BollingerBands {
  const std2 = multiplyBy(2, mstd(BB_PERIOD, closings));
  const middleBand = sma(BB_PERIOD, closings);
  const upperBand = add(middleBand, std2);
  const lowerBand = substract(middleBand, std2);

  return {
    upperBand,
    middleBand,
    lowerBand,
  };
}
