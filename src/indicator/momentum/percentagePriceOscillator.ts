// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';

/**
 * Percentage price oscillator result.
 */
export interface PPOResult {
  ppoResult: number[];
  signal: number[];
  histogram: number[];
}

/**
 * Optional configuration of PPO parameters.
 */
export interface PPOConfig {
  fast?: number;
  slow?: number;
  signal?: number;
}

/**
 * The default configuration of PPO.
 */
export const PPODefaultConfig: Required<PPOConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
};

/**
 * Percentage Price Oscillator (PPO). It is a momentum oscillator for the price.
 * It is used to indicate the ups and downs based on the price. A breakout is
 * confirmed when PPO is positive.
 *
 * PVO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 *
 * @param prices price values.
 * @param config configuration.
 * @returns oscillator result.
 */
export function ppo(prices: number[], config: PPOConfig = {}): PPOResult {
  const {
    fast: fastPeriod,
    slow: slowPeriod,
    signal: signalPeriod,
  } = { ...PPODefaultConfig, ...config };
  const fastEma = ema(prices, { period: fastPeriod });
  const slowEma = ema(prices, { period: slowPeriod });

  const ppoResult = multiplyBy(
    100,
    divide(subtract(fastEma, slowEma), slowEma)
  );
  const signal = ema(ppoResult, { period: signalPeriod });
  const histogram = subtract(ppoResult, signal);

  return {
    ppoResult,
    signal,
    histogram,
  };
}

// Export full name
export { ppo as percentagePriceOscillator };
