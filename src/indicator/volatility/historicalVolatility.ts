// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { changeRatio, windowedStd } from '../../helper/window';

/**
 * Optional configuration of Historical Volatility parameters.
 */
export interface HVConfig {
  period?: number;
}

/**
 * The default configuration of Historical Volatility.
 */
export const HVDefaultConfig: Required<HVConfig> = {
  period: 21,
};

/**
 * Historical Volatility (HV). It is the population standard deviation of
 * the one-bar returns over `period` bars.
 *
 * ```
 * R[i] = (Close[i] / Close[i-1]) - 1
 * HV = StdDev(R, period)
 * ```
 *
 * Warm-up: the first `period` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { hv } from 'indicatorts';
 *
 * const defaultConfig = { period: 21 };
 * const result = hv(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = historicalVolatility(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return historical volatility values.
 */
export function hv(closings: number[], config: HVConfig = {}): number[] {
  const { period } = { ...HVDefaultConfig, ...config };
  return windowedStd(changeRatio(closings, 1), period);
}

// Export full name
export { hv as historicalVolatility };
