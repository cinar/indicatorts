// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of RMA parameters.
 */
export interface RMAConfig {
  period?: number;
}

/**
 * The default configuration of RMA.
 */
export const RMADefaultConfig: Required<RMAConfig> = {
  period: 4,
};

/**
 * Rolling moving average (RMA).
 *
 * ```
 * R[0] to R[p-1] is SMA(values)
 * R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
 * ```
 *
 * Warm-up: until `period` values are available, the result is the average
 * of the values seen so far, so every index has a value. At index
 * `period - 1` it equals the simple moving average of the first `period`
 * values. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { rma } from 'indicatorts';
 *
 * const defaultConfig = { period: 4 };
 * const result = rma(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = rollingMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @returns RMA values.
 */
export function rma(values: number[], config: RMAConfig = {}): number[] {
  const { period } = { ...RMADefaultConfig, ...config };
  const result = new Array<number>(values.length);
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    let count = i + 1;

    if (i < period) {
      sum += values[i];
    } else {
      sum = result[i - 1] * (period - 1) + values[i];
      count = period;
    }

    result[i] = sum / count;
  }

  return result;
}

// Export full name
export { rma as rollingMovingAverage };
