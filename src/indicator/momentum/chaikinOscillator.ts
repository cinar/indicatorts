// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';
import { accumulationDistribution } from '../volume/accumulationDistribution';

/**
 * Chaikin oscillator result object.
 */
export interface ChaikinOscillator {
  ad: number[];
  co: number[];
}

/**
 * The ChaikinOscillator function measures the momentum of the
 * Accumulation/Distribution (A/D) using the Moving Average
 * Convergence Divergence (MACD) formula. It takes the
 * difference between fast and slow periods EMA of the A/D.
 * Cross above the A/D line indicates bullish.
 *
 * CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return chaikin oscillator.
 */
export function chaikinOscillator(
  fastPeriod: number,
  slowPeriod: number,
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[]
): ChaikinOscillator {
  const ad = accumulationDistribution(highs, lows, closings, volumes);
  const co = subtract(ema(fastPeriod, ad), ema(slowPeriod, ad));

  return {
    ad,
    co,
  };
}

/**
 * The defaultChaikinOscillator function calculates Chaikin Oscillator
 * with the most frequently used fast and short periods, 3 and 10.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return chaikin oscillator.
 */
export function defaultChaikinOscillator(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[]
): ChaikinOscillator {
  return chaikinOscillator(3, 10, highs, lows, closings, volumes);
}
