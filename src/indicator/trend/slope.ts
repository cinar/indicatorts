// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { lag } from '../../helper/window';

/**
 * Optional configuration of Slope parameters.
 */
export interface SlopeConfig {
  period?: number;
}

/**
 * The default configuration of Slope.
 */
export const SlopeDefaultConfig: Required<SlopeConfig> = {
  period: 14,
};

/**
 * Slope. It is the change of the value over `period` bars, divided by the
 * number of bars, that is, the average change per bar.
 *
 * ```
 * Slope = (V[i] - V[i - period]) / period
 * ```
 *
 * Warm-up: the first `period` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { slope } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = slope(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return slope values.
 */
export function slope(values: number[], config: SlopeConfig = {}): number[] {
  const { period } = { ...SlopeDefaultConfig, ...config };
  const previous = lag(values, period);

  return values.map((value, i) => (value - previous[i]) / period);
}
