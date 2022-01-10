// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {sma} from './sma';

/**
 * Trima function calculates the Triangular Moving Average (TRIMA).
 *
 * If period is even:
 *   TRIMA = SMA(period / 2, SMA((period / 2) + 1, values))
 * If period is odd:
 *   TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))
 *
 * @param period window period.
 * @param values values array.
 * @return trima values.
 */
export function trima(period: number, values: number[]): number[] {
  let n1 = 0;
  let n2 = 0;

  if (period % 2 === 0) {
    n1 = period / 2;
    n2 = n1 + 1;
  } else {
    n1 = (period + 1) / 2;
    n2 = n1;
  }

  const trimaLine = sma(n1, sma(n2, values));

  return trimaLine;
}
