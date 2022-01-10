// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Simple moving average (SMA).
 * @param period window period.
 * @param values values array.
 * @return SMA values.
 */
export function sma(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];

    if (i >= period) {
      sum -= values[i - period];
      result[i] = sum / period;
    } else {
      result[i] = sum / (i + 1);
    }
  }

  return result;
}
