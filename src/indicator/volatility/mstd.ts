// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { sma } from '../trend/sma';

/**
 * Moving strandard deviation function.
 *
 * @param period window period.
 * @param values value array.
 * @return std values.
 */
export function mstd(period: number, values: number[]): number[] {
  const result = new Array<number>(values.length);
  const averages = sma(period, values);

  for (let i = 0; i < values.length; i++) {
    result[i] = 0;

    if (i >= period - 1) {
      let sum = 0;

      for (let k = i - (period - 1); k <= i; k++) {
        sum += (values[k] - averages[i]) * (values[k] - averages[i]);
      }

      result[i] = Math.sqrt(sum / period);
    }
  }

  return result;
}
