// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of EMA parameters.
 */
export interface EMAConfig {
  period?: number;
}

/**
 * The default configuration of EMA.
 */
export const EMADefaultConfig: Required<EMAConfig> = {
  period: 12,
};

/**
 * Exponential moving average (EMA).
 *
 * Warm-up: the first value is used as the starting point
 * (`result[0] = values[0]`), so every index has a value. TA-Lib and many
 * other libraries start from the simple moving average of the first `period`
 * values instead, and leave the first `period - 1` results empty, so the
 * early values differ. The difference shrinks by a factor of
 * `1 - 2 / (period + 1)` every bar. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { ema } from 'indicatorts';
 *
 * const defaultConfig = { period: 12 };
 * const result = ema(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = exponentialMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return EMA values.
 */
export function ema(values: number[], config: EMAConfig = {}): number[] {
  const { period } = { ...EMADefaultConfig, ...config };
  const result = new Array<number>(values.length);

  if (result.length > 0) {
    const kValue = 2 / (1 + period);
    const mValue = 1 - kValue;

    result[0] = values[0];

    for (let i = 1; i < result.length; i++) {
      result[i] = values[i] * kValue + result[i - 1] * mValue;
    }
  }

  return result;
}

// Export full name
export { ema as exponentialMovingAverage };
