// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';
import { Seed } from '../types';

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
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of PPO.
 */
export const PPODefaultConfig: Required<PPOConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
  seed: 'first',
};

/**
 * Percentage Price Oscillator (PPO). It is a momentum oscillator for the price.
 * It is used to indicate the ups and downs based on the price. A breakout is
 * confirmed when PPO is positive.
 *
 * ```
 * PVO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { ppo } from 'indicatorts';
 *
 * const defaultConfig = { fast: 12, slow: 26, signal: 9 };
 * const { ppoResult, signal, histogram } = ppo(prices, defaultConfig);
 *
 * // Alternatively:
 * // const { ppoResult, signal, histogram } = percentagePriceOscillator(prices, defaultConfig);
 * ```
 * @param prices price values.
 * @param config configuration.
 * @returns oscillator result.
 */
export function ppo(prices: number[], config: PPOConfig = {}): PPOResult {
  const {
    fast: fastPeriod,
    slow: slowPeriod,
    signal: signalPeriod,
    seed,
  } = { ...PPODefaultConfig, ...config };
  const fastEma = ema(prices, { period: fastPeriod, seed });
  const slowEma = ema(prices, { period: slowPeriod, seed });

  const ppoResult = multiplyBy(
    100,
    divide(subtract(fastEma, slowEma), slowEma)
  );
  const signal = ema(ppoResult, { period: signalPeriod, seed });
  const histogram = subtract(ppoResult, signal);

  return {
    ppoResult,
    signal,
    histogram,
  };
}

// Export full name
export { ppo as percentagePriceOscillator };
