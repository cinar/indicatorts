// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {divide, substract} from '../../helper/numArray';

/**
 * The Balance of Power (BOP) function calculates the strength of buying and
 * selling pressure. Positive value indicates an upward trend, and negative
 * value indicates a downward trend. Zero indicates a balance between
 * the two.
 *
 * BOP = (Closing - Opening) / (High - Low)
 *
 * @param {number[]} openings opening values.
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {number[]} balance of power values.
 */
export function balanceOfPower(openings: number[], highs: number[],
    lows: number[], closings: number[]): number[] {
  return divide(substract(closings, openings), substract(highs, lows));
}
