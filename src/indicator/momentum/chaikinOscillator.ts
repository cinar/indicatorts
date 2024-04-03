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
 * Optional configuration of parameters
 */
export interface ChaikinOscillatorConfig {
  fast?: number;
  slow?: number;
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
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @return chaikin oscillator.
 */
export function chaikinOscillator(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[],
  config: ChaikinOscillatorConfig = {}
): ChaikinOscillator {
  const finalConfig = { fast: 3, slow: 10, ...config };
  const ad = accumulationDistribution(highs, lows, closings, volumes);
  const co = subtract(ema(finalConfig.fast, ad), ema(finalConfig.slow, ad));

  return { ad, co };
}
