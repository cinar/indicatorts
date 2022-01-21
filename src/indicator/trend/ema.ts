// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Exponential moving average (EMA).
 * @param period window period.
 * @param values values array.
 * @return EMA values.
 */
export function ema(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  if (result.length > 0) {
    const k = 2 / (1 + period);
    const m = 1 - k;

    result[0] = values[0];

    for (let i = 1; i < result.length; i++) {
      result[i] = values[i] * k + result[i - 1] * m;
    }
  }

  return result;
}
