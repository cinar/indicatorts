// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of McGinley Dynamic parameters.
 */
export interface MDConfig {
  period?: number;
}

/**
 * The default configuration of McGinley Dynamic.
 */
export const MDDefaultConfig: Required<MDConfig> = {
  period: 14,
};

/**
 * McGinley Dynamic (MD). It is a moving average whose smoothing adjusts to
 * the speed of the price: the ratio of the price to the previous value,
 * raised to the fourth power, scales the step toward the price.
 *
 * ```
 * MD[0] = Close[0]
 * MD[i] = MD[i-1] + (Close[i] - MD[i-1]) / (period * (Close[i] / MD[i-1])^4)
 * ```
 *
 * A previous value of 0 restarts the average from the current close.
 *
 * @example
 * ```TypeScript
 * import { md } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = md(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = mcGinleyDynamic(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return md values.
 */
export function md(closings: number[], config: MDConfig = {}): number[] {
  const { period } = { ...MDDefaultConfig, ...config };
  const result = new Array<number>(closings.length);

  for (let i = 0; i < closings.length; i++) {
    const previous = i === 0 ? 0 : result[i - 1];
    const closing = closings[i];

    result[i] =
      previous === 0
        ? closing
        : previous +
          (closing - previous) / (period * Math.pow(closing / previous, 4));
  }

  return result;
}

// Export full name
export { md as mcGinleyDynamic };
