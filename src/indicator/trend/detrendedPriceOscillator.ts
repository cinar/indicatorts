// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { lag, windowedSma } from '../../helper/window';

/**
 * Optional configuration of DPO parameters.
 */
export interface DPOConfig {
  period?: number;
}

/**
 * The default configuration of DPO.
 */
export const DPODefaultConfig: Required<DPOConfig> = {
  period: 20,
};

/**
 * Detrended Price Oscillator (DPO). It compares a past price with the current
 * simple moving average, which removes the longer-term trend and leaves the
 * shorter cycles.
 *
 * ```
 * k = floor(period / 2) + 1
 * DPO[i] = Price[i - k] - SMA(Price, period)[i]
 * ```
 *
 * Warm-up: the first `max(period - 1, k)` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { dpo } from 'indicatorts';
 *
 * const defaultConfig = { period: 20 };
 * const result = dpo(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = detrendedPriceOscillator(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return dpo values.
 */
export function dpo(closings: number[], config: DPOConfig = {}): number[] {
  const { period } = { ...DPODefaultConfig, ...config };
  const shift = Math.floor(period / 2) + 1;
  const average = windowedSma(closings, period);
  const shifted = lag(closings, shift);

  return average.map((value, i) => shifted[i] - value);
}

// Export full name
export { dpo as detrendedPriceOscillator };
