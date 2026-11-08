// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { safeDivide, windowedSma, windowedStd } from '../../helper/window';

/**
 * Optional configuration of %B parameters.
 */
export interface PercentBConfig {
  period?: number;
}

/**
 * The default configuration of %B.
 */
export const PercentBDefaultConfig: Required<PercentBConfig> = {
  period: 20,
};

/**
 * Percent B (%B). It is the position of the close between the lower and
 * the upper Bollinger Band, on a 0 to 1 scale: 0 at the lower band and 1 at
 * the upper band.
 *
 * ```
 * Middle = SMA(closings, period)
 * Upper = Middle + 2 * StdDev(closings, period)
 * Lower = Middle - 2 * StdDev(closings, period)
 * %B = (Close - Lower) / (Upper - Lower)
 * ```
 *
 * The standard deviation is the population standard deviation. When every
 * close in the window is equal, the bands meet and %B is 0.5.
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { percentB } from 'indicatorts';
 *
 * const defaultConfig = { period: 20 };
 * const result = percentB(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return %B values.
 */
export function percentB(
  closings: number[],
  config: PercentBConfig = {}
): number[] {
  const { period } = { ...PercentBDefaultConfig, ...config };
  const middle = windowedSma(closings, period);
  const std = windowedStd(closings, period);

  return closings.map((closing, i) => {
    const lower = middle[i] - 2 * std[i];
    return safeDivide(closing - lower, 4 * std[i], 0.5);
  });
}
