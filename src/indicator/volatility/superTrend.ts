// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { trueRanges } from '../../helper/window';
import { hma } from '../trend/hullMovingAverage';

/**
 * Optional configuration of Super Trend parameters.
 */
export interface SuperTrendConfig {
  period?: number;
  multiplier?: number;
}

/**
 * The default configuration of Super Trend.
 */
export const SuperTrendDefaultConfig: Required<SuperTrendConfig> = {
  period: 14,
  multiplier: 2.5,
};

/**
 * Super Trend. It places bands at a multiple of the average true range
 * above and below the median price. The upper band only moves down and the
 * lower band only moves up, unless the previous close crossed them, and the
 * result follows one band until the close crosses it, then switches to the
 * other.
 *
 * ```
 * ATR = HMA(TR, period)
 * BasicUpper = (High + Low) / 2 + multiplier * ATR
 * BasicLower = (High + Low) / 2 - multiplier * ATR
 * FinalUpper = BasicUpper if BasicUpper < previous FinalUpper or previous Close > previous FinalUpper,
 *              else previous FinalUpper
 * FinalLower = BasicLower if BasicLower > previous FinalLower or previous Close < previous FinalLower,
 *              else previous FinalLower
 * Following the upper band: Super Trend = FinalUpper while Close <= FinalUpper, else switch to FinalLower
 * Following the lower band: Super Trend = FinalLower while Close >= FinalLower, else switch to FinalUpper
 * ```
 *
 * The average true range is smoothed with the Hull Moving Average, as in the
 * Go version of this library, and starts at the first full window. The
 * first value follows the lower band.
 *
 * Warm-up: the first `period + round(sqrt(period)) - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { superTrend } from 'indicatorts';
 *
 * const defaultConfig = { period: 14, multiplier: 2.5 };
 * const result = superTrend(highs, lows, closings, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return super trend values.
 */
export function superTrend(
  highs: number[],
  lows: number[],
  closings: number[],
  config: SuperTrendConfig = {}
): number[] {
  checkSameLength(highs, lows, closings);

  const { period, multiplier } = { ...SuperTrendDefaultConfig, ...config };
  const atr = hma(trueRanges(highs, lows, closings), { period });
  const result = new Array<number>(closings.length).fill(NaN);
  const start = atr.findIndex((value) => Number.isFinite(value));

  if (start === -1) {
    return result;
  }

  let finalUpper = NaN;
  let finalLower = NaN;
  let followingUpper = false;

  for (let i = start; i < closings.length; i++) {
    const median = (highs[i] + lows[i]) / 2;
    const basicUpper = median + multiplier * atr[i];
    const basicLower = median - multiplier * atr[i];
    const closing = closings[i];

    if (i === start) {
      finalUpper = basicUpper;
      finalLower = basicLower;
      result[i] = finalLower;
      continue;
    }

    const previous = closings[i - 1];

    if (basicUpper < finalUpper || previous > finalUpper) {
      finalUpper = basicUpper;
    }

    if (basicLower > finalLower || previous < finalLower) {
      finalLower = basicLower;
    }

    if (followingUpper) {
      followingUpper = closing <= finalUpper;
    } else {
      followingUpper = closing < finalLower;
    }

    result[i] = followingUpper ? finalUpper : finalLower;
  }

  return result;
}
