// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {substract} from '../../helper/numArray';
import {ema} from './ema';

/**
 * Absolute Price Oscillator (APO) function calculates the technical indicator
 * that is used to follow trends. APO crossing above zero indicates bullish,
 * while crossing below zero indicates bearish. Positive value is upward
 * trend, while negative value is downward trend.
 *
 * Fast = EMA(fastPeriod, values)
 * Slow = EMA(slowPeriod, values)
 * APO = Fast - Slow
 *
 * @param {number} fastPeriod fast period.
 * @param {number} slowPeriod slow period.
 * @param {number[]} values values array.
 * @return {number[]} apo array.
 */
export function absolutePriceOscillator(
    fastPeriod: number,
    slowPeriod: number,
    values: number[],
): number[] {
  const fast = ema(fastPeriod, values);
  const slow = ema(slowPeriod, values);
  const apo = substract(fast, slow);
  return apo;
}

/**
 * Default APO function calculates APO with frequently used fast period 14,
 * and slow period 30.
 * @param {number[]} values values array.
 * @return {number[]} apo array.
 */
export function defaultAbsolutePriceOscillator(values: number[]): number[] {
  return absolutePriceOscillator(14, 30, values);
}
