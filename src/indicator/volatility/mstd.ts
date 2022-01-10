// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Moving strandard deviation function.
 *
 * @param {number} period window period.
 * @param {number[]} values value array.
 * @return {number[]} std values.
 */
export function mstd(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);

  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];

    if (i >= period - 1) {
      if (i >= period) {
        sum -= values[i - period];
      }

      const average = sum / period;
      let ss = 0;

      for (let j = 0; j < period; j++) {
        ss += Math.pow(values[i - j] - average, 2);
      }

      result[i] = Math.sqrt(ss / period);
    } else {
      result[i] = 0;
    }
  }

  return result;
}
