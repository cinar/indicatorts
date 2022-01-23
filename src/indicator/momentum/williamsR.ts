// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, substract } from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';

const PERIOD = 14;

/**
 * Williams R. Determine overbought and oversold.
 *
 * WR = (Highest High - Closing) / (Highest High - Lowest Low) * -100.
 *
 * Buy when -80 and below. Sell when -20 and above.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return wr values.
 */
export function williamsR(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  const highestHigh = mmax(PERIOD, highs);
  const lowestLow = mmin(PERIOD, lows);
  return multiplyBy(
    -100,
    divide(substract(highestHigh, closings), substract(highestHigh, lowestLow))
  );
}
