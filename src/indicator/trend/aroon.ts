// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  addBy,
  checkSameLength,
  divideBy,
  multiplyBy,
} from '../../helper/numArray';

/**
 * Aroon result.
 */
export interface AroonResult {
  up: number[];
  down: number[];
}

/**
 * Optional configuration of Aroon parameters.
 */
export interface AroonConfig {
  period?: number;
}

/**
 * The default configuration of Aroon.
 */
export const AroonDefaultConfig: Required<AroonConfig> = {
  period: 25,
};

/**
 * Computes, for each bar, the number of bars since the most recent
 * occurrence of the extreme (max or min) value within the trailing
 * `period`-bar window ending at that bar. During warmup (before `period`
 * bars have been seen) the window is `[0, i]`, matching the effective
 * window used by `mmax`/`mmin`. When there are ties for the extreme value
 * within the window, the most recent occurrence is preferred.
 *
 * @param values input values.
 * @param period window size.
 * @param isMoreExtreme comparator returning true when `candidate` should
 *   replace `current` as the extreme (e.g. `(a, b) => a >= b` for max).
 * @return periods since the extreme value for each bar.
 */
function periodsSinceExtreme(
  values: number[],
  period: number,
  isMoreExtreme: (candidate: number, current: number) => boolean
): number[] {
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    const from = Math.max(0, i - period + 1);
    let extremeIndex = from;

    for (let j = from + 1; j <= i; j++) {
      if (isMoreExtreme(values[j], values[extremeIndex])) {
        extremeIndex = j;
      }
    }

    result[i] = i - extremeIndex;
  }

  return result;
}

/**
 * Aroon Indicator. It is a technical indicator that is used to identify trend changes
 * in the price of a stock, as well as the strength of that trend. It consists of two
 * lines, Arron Up, and Aroon Down. The Aroon Up line measures the strength of the
 * uptrend, and the Aroon Down measures the strength of the downtrend. When Aroon Up
 * is above Aroon Down, it indicates bullish price, and when Aroon Down is above
 * Aroon Up, it indicates bearish price.
 *
 * Aroon Up = ((25 - Period Since Last 25 Period High) / 25) * 100
 * Aroon Down = ((25 - Period Since Last 25 Period Low) / 25) * 100
 *
 * @param highs highs values.
 * @param lows lows values.
 * @param config configuration.
 * @return aroon result.
 */
export function aroon(
  highs: number[],
  lows: number[],
  config: AroonConfig = {}
): AroonResult {
  checkSameLength(highs, lows);

  const { period } = { ...AroonDefaultConfig, ...config };

  const sinceLastHigh = periodsSinceExtreme(highs, period, (a, b) => a >= b);
  const sinceLastLow = periodsSinceExtreme(lows, period, (a, b) => a <= b);

  const up = multiplyBy(
    100,
    divideBy(period, addBy(period, multiplyBy(-1, sinceLastHigh)))
  );

  const down = multiplyBy(
    100,
    divideBy(period, addBy(period, multiplyBy(-1, sinceLastLow)))
  );

  return {
    up,
    down,
  };
}
