// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, divideBy, substract } from '../../helper/numArray';
import { sma } from '../trend/sma';

/**
 * Awesome Oscillator.
 *
 * Median Price = ((Low + High) / 2).
 * AO = 5-Period SMA - 34-Period SMA.
 *
 * @param highs high values.
 * @param lows low values.
 * @return awesome oscillator.
 */
export function awesomeOscillator(highs: number[], lows: number[]): number[] {
  const medianPrice = divideBy(2, add(lows, highs));
  const sma5 = sma(5, medianPrice);
  const sma34 = sma(34, medianPrice);
  const ao = substract(sma5, sma34);
  return ao;
}
