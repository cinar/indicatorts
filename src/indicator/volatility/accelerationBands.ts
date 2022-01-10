// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {add, addBy, checkSameLength, divide, multiply, multiplyBy, substract} from '../../helper/numArray';
import {sma} from '../trend/sma';

/**
 * Acceleration bands result object.
 */
export interface AccelerationBands {
  upperBand: number[];
  middleBand: number[];
  lowerBand: number[];
}

/**
 * Acceleration Bands. Plots upper and lower envelope bands
 * around a simple moving average.
 *
 * Upper Band = SMA(High * (1 + 4 * (High - Low) / (High + Low)))
 * Middle Band = SMA(Closing)
 * Lower Band = SMA(Low * (1 - 4 * (High - Low) / (High + Low)))
 *
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {AccelerationBands} acceleration band.
 */
export function accelerationBands(
    highs: number[],
    lows: number[],
    closings: number[],
): AccelerationBands {
  checkSameLength(highs, lows, closings);

  const k = divide(substract(highs, lows), add(highs, lows));

  const upperBand = sma(20, multiply(highs, addBy(1, multiplyBy(4, k))));
  const middleBand = sma(20, closings);
  const lowerBand = sma(20, multiply(lows, addBy(1, multiplyBy(-4, k))));

  return {
    upperBand,
    middleBand,
    lowerBand,
  };
}
