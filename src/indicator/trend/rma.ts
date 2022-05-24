// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Rolling moving average (RMA).
 *
 * R[0] to R[p-1] is SMA(values)
 * R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
 *
 * @param period window period.
 * @param values values array.
 * @returns RMA values.
 */
export function rma(period: number, values: number[]): number[] {
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
