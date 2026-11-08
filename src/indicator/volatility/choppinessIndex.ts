// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { trueRanges } from '../../helper/trueRanges';
import {
  maskNaN,
  windowed,
  windowedMax,
  windowedMin,
} from '../../helper/window';

/**
 * Optional configuration of Choppiness Index parameters.
 */
export interface CHOPConfig {
  period?: number;
}

/**
 * The default configuration of Choppiness Index.
 */
export const CHOPDefaultConfig: Required<CHOPConfig> = {
  period: 14,
};

/**
 * Choppiness Index (CHOP). It compares the sum of the true ranges over
 * `period` bars with the range from the highest high to the lowest low
 * over the same bars, on a logarithmic 0 to 100 scale. Values near 100
 * come from many overlapping bars and values near 0 from bars that extend
 * the range in one direction.
 *
 * ```
 * CHOP = 100 * Log10(Sum(TR, period) / (Max(High, period) - Min(Low, period))) / Log10(period)
 * ```
 *
 * The true range uses the previous close, so it starts at the second bar.
 * A window without a range (highest high equal to lowest low) is 0.
 *
 * Warm-up: the first `period` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { chop } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = chop(highs, lows, closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = choppinessIndex(highs, lows, closings, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return choppiness index values.
 */
export function chop(
  highs: number[],
  lows: number[],
  closings: number[],
  config: CHOPConfig = {}
): number[] {
  checkSameLength(highs, lows, closings);

  const { period } = { ...CHOPDefaultConfig, ...config };
  const sums = windowed(trueRanges(highs, lows, closings), period, (window) =>
    window.reduce((sum, value) => sum + value, 0)
  );
  const highest = maskNaN(windowedMax(highs, period), sums);
  const lowest = windowedMin(lows, period);
  const scale = Math.log10(period);

  return sums.map((sum, i) => {
    const range = highest[i] - lowest[i];
    return range === 0 ? 0 : (100 * Math.log10(sum / range)) / scale;
  });
}

// Export full name
export { chop as choppinessIndex };
