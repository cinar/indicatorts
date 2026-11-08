// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { apo } from './absolutePriceOscillator';
import { stochastic } from './stochastic';

/**
 * Optional configuration of STC parameters.
 */
export interface STCConfig {
  fast?: number;
  slow?: number;
  kPeriod?: number;
  dPeriod?: number;
}

/**
 * The default configuration of STC.
 */
export const STCDefaultConfig: Required<STCConfig> = {
  fast: 23,
  slow: 50,
  kPeriod: 10,
  dPeriod: 3,
};

/**
 * Schaff Trend Cycle (STC). It applies the single-series Stochastic twice to
 * the difference of a fast and a slow exponential moving average, which
 * bounds the MACD line to a 0 to 100 scale.
 *
 * ```
 * MACD = EMA(closings, fast) - EMA(closings, slow)
 * %K1, %D1 = Stochastic(MACD, kPeriod, dPeriod)
 * %K2, %D2 = Stochastic(%D1, kPeriod, dPeriod)
 * STC = %D2
 * ```
 *
 * Both EMAs start from the simple moving average of their first values.
 *
 * Warm-up: the first `slow - 1 + 2 * (kPeriod + dPeriod - 2)` values are
 * NaN.
 *
 * @example
 * ```TypeScript
 * import { stc } from 'indicatorts';
 *
 * const defaultConfig = { fast: 23, slow: 50, kPeriod: 10, dPeriod: 3 };
 * const result = stc(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = schaffTrendCycle(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return stc values.
 */
export function stc(closings: number[], config: STCConfig = {}): number[] {
  const { fast, slow, kPeriod, dPeriod } = { ...STCDefaultConfig, ...config };
  const macd = apo(closings, { fast, slow, seed: 'sma' });
  const first = stochastic(macd, { period: kPeriod, dPeriod });

  return stochastic(first.d, { period: kPeriod, dPeriod }).d;
}

// Export full name
export { stc as schaffTrendCycle };
