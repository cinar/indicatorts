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
 * Detrended Price Oscillator (DPO). It subtracts a simple moving average,
 * shifted back by `floor(period / 2) + 1` bars, from the price, which
 * removes the longer-term trend and leaves the shorter cycles.
 *
 * ```
 * k = floor(period / 2) + 1
 * DPO[i] = Price[i] - SMA(Price, period)[i - k]
 * ```
 *
 * Warm-up: the first `period - 1 + k` values are NaN.
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
  const shifted = lag(
    windowedSma(closings, period),
    Math.floor(period / 2) + 1
  );

  return closings.map((closing, i) => closing - shifted[i]);
}

// Export full name
export { dpo as detrendedPriceOscillator };
