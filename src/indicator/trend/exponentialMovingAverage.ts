// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { smaSeeded } from '../../helper/smaSeeded';
import { Seed } from '../types';
/**
 * Optional configuration of EMA parameters.
 */
export interface EMAConfig {
  period?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of EMA.
 */
export const EMADefaultConfig: Required<EMAConfig> = {
  period: 12,
  seed: 'first',
};

/**
 * Exponential moving average (EMA).
 *
 * Warm-up: the first value is used as the starting point
 * (`result[0] = values[0]`), so every index has a value. TA-Lib and many
 * other libraries start from the simple moving average of the first `period`
 * values instead, and leave the first `period - 1` results empty, so the
 * early values differ. The difference shrinks by a factor of
 * `1 - 2 / (period + 1)` every bar. Set `seed: 'sma'` to start from the
 * simple moving average instead, as TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
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
  const { period, seed } = { ...EMADefaultConfig, ...config };
  const kValue = 2 / (1 + period);
  const mValue = 1 - kValue;

  if (seed === 'sma') {
    return smaSeeded(
      values,
      period,
      (previous, value) => value * kValue + previous * mValue
    );
  }

  const result = new Array<number>(values.length);

  if (result.length > 0) {
    result[0] = values[0];

    for (let i = 1; i < result.length; i++) {
      result[i] = values[i] * kValue + result[i - 1] * mValue;
    }
  }

  return result;
}

// Export full name
export { ema as exponentialMovingAverage };
