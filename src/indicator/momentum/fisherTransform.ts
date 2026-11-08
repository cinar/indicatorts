// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { windowedMax, windowedMin } from '../../helper/window';

/**
 * Bound of the normalized value before the logarithm, which keeps the
 * transform finite.
 */
export const FISHER_CLAMP = 0.999;

/**
 * Optional configuration of Fisher Transform parameters.
 */
export interface FisherConfig {
  period?: number;
}

/**
 * The default configuration of Fisher Transform.
 */
export const FisherDefaultConfig: Required<FisherConfig> = {
  period: 10,
};

/**
 * Fisher Transform. It maps the position of the close within the range of
 * the last `period` closings to the -1 to 1 scale and applies the Fisher
 * transform to it, which spreads values near the ends of the range apart.
 *
 * ```
 * x = 2 * ((Close - Min(Close, period)) / (Max(Close, period) - Min(Close, period))) - 1
 * Fisher = 0.5 * ln((1 + x) / (1 - x))
 * ```
 *
 * `x` is clamped to -0.999 to 0.999. This is the simplified, non-recursive
 * form on the closings; `ehlersFisher` is the recursive form that John
 * Ehlers published, on the median price. A window whose closings are all
 * equal has no range, and its value is NaN.
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { fisher } from 'indicatorts';
 *
 * const defaultConfig = { period: 10 };
 * const result = fisher(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = fisherTransform(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return fisher values.
 */
export function fisher(
  closings: number[],
  config: FisherConfig = {}
): number[] {
  const { period } = { ...FisherDefaultConfig, ...config };
  const highest = windowedMax(closings, period);
  const lowest = windowedMin(closings, period);

  return closings.map((closing, i) => {
    const normalized = (closing - lowest[i]) / (highest[i] - lowest[i]);
    const x = Math.min(
      FISHER_CLAMP,
      Math.max(-FISHER_CLAMP, 2 * normalized - 1)
    );
    return Number.isNaN(normalized) ? NaN : 0.5 * Math.log((1 + x) / (1 - x));
  });
}

// Export full name
export { fisher as fisherTransform };
