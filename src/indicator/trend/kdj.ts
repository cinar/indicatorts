// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { mmin } from './mmin';
import { mmax } from './mmax';
import { sma } from './sma';

/**
 * KDJ result.
 */
export interface KdjResult {
  k: number[];
  d: number[];
  j: number[];
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
 * @param rPeriod r period.
 * @param kPeriod k period.
 * @param dPeriod d period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return kdj result.
 */
export function kdj(
  rPeriod: number,
  kPeriod: number,
  dPeriod: number,
  highs: number[],
  lows: number[],
  closings: number[]
): KdjResult {
  const highest = mmax(rPeriod, highs);
  const lowest = mmin(rPeriod, lows);

  const rsv = multiplyBy(
    100,
    divide(subtract(closings, lowest), subtract(highest, lowest))
  );

  const k = sma(kPeriod, rsv);
  const d = sma(dPeriod, k);
  const j = subtract(multiplyBy(3, k), multiplyBy(2, d));

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
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return kdj result.
 */
export function defaultKdj(
  highs: number[],
  lows: number[],
  closings: number[]
): KdjResult {
  return kdj(9, 3, 3, highs, lows, closings);
}
