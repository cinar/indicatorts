// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {substract} from '../../helper/numArray';
import {sma} from './sma';

/**
 * The Qstick function calculates the ratio of recent up and down bars.
 *
 * QS = Sma(Closing - Opening)
 *
 * @param {number} period window period.
 * @param {number[]} openings openinig values.
 * @param {number[]} closings closing values.
 * @return {number[]} qstick values.
 */
export function qstick(period: number, openings: number[],
    closings: number[]): number[] {
  return sma(period, substract(closings, openings));
}
