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
 * Optional configuration of Kdj parameters.
 */
export interface KdjConfig {
  rPeriod?: number;
  kPeriod?: number;
  dPeriod?: number;
}

/**
 * The default configuration of Kdj.
 */
export const KdjDefaultConfig: Required<KdjConfig> = {
  rPeriod: 9,
  kPeriod: 3,
  dPeriod: 3,
};

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
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return kdj result.
 */
export function kdj(
  highs: number[],
  lows: number[],
  closings: number[],
  config: KdjConfig = {}
): KdjResult {
  const { rPeriod, kPeriod, dPeriod } = { ...KdjDefaultConfig, ...config };
  const highest = mmax(highs, { period: rPeriod });
  const lowest = mmin(lows, { period: rPeriod });

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
