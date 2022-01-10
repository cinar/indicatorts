// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {substract} from '../../helper/numArray';
import {sma} from './sma';

/**
 * The Qstick function calculates the ratio of recent up and down bars.
 *
 * QS = Sma(Closing - Opening)
 *
 * @param period window period.
 * @param openings openinig values.
 * @param closings closing values.
 * @return qstick values.
 */
export function qstick(period: number, openings: number[],
    closings: number[]): number[] {
  return sma(period, substract(closings, openings));
}
