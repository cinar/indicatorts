// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

// Internal helper for the `seed: 'sma'` option. It is not exported from the
// package entry point.

/**
 * Computes a recursive average that starts from the simple moving average
 * of the first `period` finite values. Leading non-finite values, such as
 * the warm-up of another SMA-seeded average, are skipped, so seeded
 * averages can be chained. The results before the seed are NaN.
 *
 * @param values values array.
 * @param period seed period.
 * @param next computes a result from the previous result and the value.
 * @return seeded values.
 */
export function smaSeeded(
  values: number[],
  period: number,
  next: (previous: number, value: number) => number
): number[] {
  const result = new Array<number>(values.length).fill(NaN);
  const start = values.findIndex((value) => Number.isFinite(value));

  if (start === -1 || start + period > values.length) {
    return result;
  }

  let sum = 0;
  for (let i = start; i < start + period; i++) {
    sum += values[i];
  }

  result[start + period - 1] = sum / period;

  for (let i = start + period; i < values.length; i++) {
    result[i] = next(result[i - 1], values[i]);
  }

  return result;
}
