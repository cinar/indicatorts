// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';

/** Default fast period value. */
const DEFAULT_FAST_PERIOD = 12;

/** Default slow period value. */
const DEFAULT_SLOW_PERIOD = 26;

/** Default signal period value. */
const DEFAULT_SIGNAL_PERIOD = 9;

/**
 * Percentage price oscillator result.
 */
export interface PercentagePriceOscillator {
  ppo: number[];
  signal: number[];
  histogram: number[];
}

/**
 * Percentage Price Oscillator (PPO). It is a momentum oscillator for the price.
 * It is used to indicate the ups and downs based on the price. A breakout is
 * confirmed when PPO is positive.
 *
 * PVO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param signalPeriod signal period.
 * @param prices price values.
 * @returns oscillator result.
 */
export function percentagePriceOscillator(
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number,
  prices: number[]
): PercentagePriceOscillator {
  const fastEma = ema(fastPeriod, prices);
  const slowEma = ema(slowPeriod, prices);

  const ppo = multiplyBy(100, divide(subtract(fastEma, slowEma), slowEma));
  const signal = ema(signalPeriod, ppo);
  const histogram = subtract(ppo, signal);

  return {
    ppo,
    signal,
    histogram,
  };
}

/**
 * Default Percentage Price Oscillator calculates it with the default periods of 12, 26, 9.
 *
 * @param prices price values.
 * @returns oscillator result.
 */
export function defaultPercentagePriceOscillator(
  prices: number[]
): PercentagePriceOscillator {
  return percentagePriceOscillator(
    DEFAULT_FAST_PERIOD,
    DEFAULT_SLOW_PERIOD,
    DEFAULT_SIGNAL_PERIOD,
    prices
  );
}
