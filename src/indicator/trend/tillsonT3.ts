// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of T3 parameters.
 */
export interface T3Config {
  period?: number;
  volumeFactor?: number;
}

/**
 * The default configuration of T3.
 */
export const T3DefaultConfig: Required<T3Config> = {
  period: 5,
  volumeFactor: 0.7,
};

/**
 * Tillson T3 Moving Average (T3). It chains six exponential moving averages
 * and combines the last four with weights derived from the volume factor.
 * The weights sum to 1, so a constant input is reproduced exactly.
 *
 * ```
 * EMA1 = EMA(closings, period), EMA2 = EMA(EMA1, period), ..., EMA6 = EMA(EMA5, period)
 * c1 = -a^3
 * c2 = 3a^2 + 3a^3
 * c3 = -6a^2 - 3a - 3a^3
 * c4 = 1 + 3a + 3a^2 + a^3
 * T3 = c1 * EMA6 + c2 * EMA5 + c3 * EMA4 + c4 * EMA3
 * ```
 *
 * where `a` is the volume factor. Each EMA starts from the simple moving
 * average of its first `period` values.
 *
 * Warm-up: the first `6 * (period - 1)` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { t3 } from 'indicatorts';
 *
 * const defaultConfig = { period: 5, volumeFactor: 0.7 };
 * const result = t3(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = tillsonT3(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return t3 values.
 */
export function t3(closings: number[], config: T3Config = {}): number[] {
  const { period, volumeFactor: a } = { ...T3DefaultConfig, ...config };
  const emas: number[][] = [];

  let input = closings;
  for (let i = 0; i < 6; i++) {
    input = ema(input, { period, seed: 'sma' });
    emas.push(input);
  }

  const c1 = -a * a * a;
  const c2 = 3 * a * a + 3 * a * a * a;
  const c3 = -6 * a * a - 3 * a - 3 * a * a * a;
  const c4 = 1 + 3 * a + 3 * a * a + a * a * a;

  return emas[5].map(
    (ema6, i) => c1 * ema6 + c2 * emas[4][i] + c3 * emas[3][i] + c4 * emas[2][i]
  );
}

// Export full name
export { t3 as tillsonT3 };
