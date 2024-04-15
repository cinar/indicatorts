// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';
import { ad } from '../volume/accumulationDistribution';

/**
 * Chaikin oscillator result object.
 */
export interface CMOResult {
  adResult: number[];
  cmoResult: number[];
}

/**
 * Optional configuration of Chaikin oscillator parameters.
 */
export interface CMOConfig {
  fast?: number;
  slow?: number;
}

/**
 * The default configuration of Chaikin oscillator.
 */
export const CMODefaultConfig: Required<CMOConfig> = {
  fast: 3,
  slow: 10,
};

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
export function cmo(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[],
  config: CMOConfig = {}
): CMOResult {
  const { fast, slow } = { ...CMODefaultConfig, ...config };
  const adResult = ad(highs, lows, closings, volumes);
  const cmoResult = subtract(
    ema(adResult, { period: fast }),
    ema(adResult, { period: slow })
  );

  return { adResult, cmoResult };
}

// Export full name
export { cmo as chaikinOscillator };
