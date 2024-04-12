// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, divideBy } from '../../helper/numArray';

/**
 * The Typical Price. It is another approximation of
 * average price for each period and can be used as
 * a filter for moving average systems.
 *
 * TPI = (High + Low + Closing) / 3
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return tpi values.
 */
export function typprice(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  return divideBy(3, add(add(highs, lows), closings));
}

// Export full name
export { typprice as typicalPrice };
