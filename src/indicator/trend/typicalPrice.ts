// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {add, divideBy} from '../../helper/numArray';

/**
 * The Typical Price. It is another approximation of
 * average price for each period and can be used as
 * a filter for moving average systems.
 *
 * TPI = (High + Low + Closing) / 3
 *
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {number[]} tpi values.
 */
export function typicalPrice(
    highs: number[],
    lows: number[],
    closings: number[],
): number[] {
  return divideBy(3, add(add(highs, lows), closings));
}
