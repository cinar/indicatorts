// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {divide, multiplyBy, substract} from '../../helper/numArray';
import {mmin} from './mmin';
import {mmax} from './mmax';
import {sma} from './sma';

/**
 * KDJ result.
 */
export interface KdjResult {
  k: number[],
  d: number[],
  j: number[]
}

/**
 * The kdj function calculates the KDJ  indicator, also known as
 * the Random Index. KDJ is calculated similar to the Stochastic
 * Oscillator with the difference of having the J line. It is
 * used to analyze the trend and entry points.
 *
 * The K and D lines show if the asset is overbought when they
 * crosses above 80%, and oversold when they crosses below
 * 20%. The J line represents the divergence.
 *
 * RSV = ((Closing - Min(Low, rPeriod))
 *       / (Max(High, rPeriod) - Min(Low, rPeriod))) * 100
 * K = Sma(RSV, kPeriod)
 * D = Sma(K, dPeriod)
 * J = (3 * K) - (2 * D)
 *
 * @param {number} rPeriod r period.
 * @param {number} kPeriod k period.
 * @param {number} dPeriod d period.
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {KdjResult} kdj result.
 */
export function kdj(
    rPeriod: number,
    kPeriod: number,
    dPeriod: number,
    highs: number[],
    lows: number[],
    closings: number[],
): KdjResult {
  const highest = mmax(rPeriod, highs);
  const lowest = mmin(rPeriod, lows);

  const rsv = multiplyBy(100, divide(substract(closings, lowest), substract(highest, lowest)));

  const k = sma(kPeriod, rsv);
  const d = sma(dPeriod, k);
  const j = substract(multiplyBy(3, k), multiplyBy(2, d));

  return {
    k,
    d,
    j,
  };
}

/**
 * The defaultKdj function calculates KDJ based on default periods
 * consisting of rPeriod of 9, kPeriod of 3, and dPeriod of 3.
 *
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {KdjResult} kdj result.
 */
export function defaultKdj(
    highs: number[],
    lows: number[],
    closings: number[],
): KdjResult {
  return kdj(9, 3, 3, highs, lows, closings);
}
