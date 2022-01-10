// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Moving sum of the given values.
 * @param {number} period window period.
 * @param {number[]} values values array.
 * @return {number[]} sum values.
 */
export function msum(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];

    if (i >= period) {
      sum -= values[i - period];
    }

    result[i] = sum;
  }

  return result;
}
