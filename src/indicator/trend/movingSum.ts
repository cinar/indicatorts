// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of moving sum parameters.
 */
export interface MSumConfig {
  period?: number;
}

/**
 * The default configuration of moving sum.
 */
export const MSumDefaultConfig: Required<MSumConfig> = {
  period: 4,
};

/**
 * Moving sum of the given values.
 *
 * The sum is maintained incrementally, adding the incoming value and
 * subtracting the outgoing one, which keeps it O(n). Two safeguards keep
 * that running sum exact where it matters:
 *
 * - A window holding only zeros sums to exactly 0. Without this, the
 *   floating point residue left by subtracting fractional values (for
 *   example, 4.4e-16) survives, and callers that guard divisions with
 *   `sum === 0` (VWAP, VWMA, CMF, MFI) would divide by it instead.
 * - A non-finite value (NaN or Infinity) only affects the windows that
 *   contain it. Subtracting it back out would leave NaN forever, so the
 *   sum is recomputed from the window once that value leaves it.
 *
 * @example
 * ```TypeScript
 * import { msum } from 'indicatorts';
 *
 * const defaultConfig = { period: 4 };
 * const result = msum(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = movingSum(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return sum values.
 */
export function msum(values: number[], config: MSumConfig = {}): number[] {
  const { period } = { ...MSumDefaultConfig, ...config };
  const result = new Array<number>(values.length);
  let sum = 0;
  let nonZeroCount = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];

    if (values[i] !== 0) {
      nonZeroCount++;
    }

    if (i >= period) {
      const outgoing = values[i - period];

      if (outgoing !== 0) {
        nonZeroCount--;
      }

      if (Number.isFinite(outgoing)) {
        sum -= outgoing;
      } else {
        sum = 0;
        for (let j = i - period + 1; j <= i; j++) {
          sum += values[j];
        }
      }
    }

    if (nonZeroCount === 0) {
      sum = 0;
    }

    result[i] = sum;
  }

  return result;
}

// Export full name
export { msum as movingSum };
