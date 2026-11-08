// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { hv } from './historicalVolatility';

/**
 * Optional configuration of Annualized Historical Volatility parameters.
 */
export interface AHVConfig {
  period?: number;
  tradingDaysPerYear?: number;
}

/**
 * The default configuration of Annualized Historical Volatility.
 */
export const AHVDefaultConfig: Required<AHVConfig> = {
  period: 21,
  tradingDaysPerYear: 252,
};

/**
 * Annualized Historical Volatility (AHV). It scales the historical
 * volatility of daily returns to a year by the square root of the number
 * of trading days in a year.
 *
 * ```
 * AHV = HV(closings, period) * Sqrt(tradingDaysPerYear)
 * ```
 *
 * Warm-up: the first `period` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { ahv } from 'indicatorts';
 *
 * const defaultConfig = { period: 21, tradingDaysPerYear: 252 };
 * const result = ahv(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = annualizedHistoricalVolatility(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return annualized historical volatility values.
 */
export function ahv(closings: number[], config: AHVConfig = {}): number[] {
  const { period, tradingDaysPerYear } = { ...AHVDefaultConfig, ...config };
  const factor = Math.sqrt(tradingDaysPerYear);

  return hv(closings, { period }).map((value) => value * factor);
}

// Export full name
export { ahv as annualizedHistoricalVolatility };
