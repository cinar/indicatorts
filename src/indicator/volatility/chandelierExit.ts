// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';
import { atr } from './atr';

const PERIOD = 22;

/**
 * Chandelier exit result object.
 */
export interface ChandelierExitResult {
  exitLong: number[];
  exitShort: number[];
}

/**
 * Chandelier Exit. It sets a trailing stop-loss based on the
 * Average True Value (ATR).
 *
 * Long Exit = 22-Period SMA High - ATR(22) * 3
 * Chandelier Exit Short = 22-Period SMA Low + ATR(22) * 3
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return chandelier exit.
 */
export function chandelierExit(
  highs: number[],
  lows: number[],
  closings: number[]
): ChandelierExitResult {
  const atrResult = atr(PERIOD, highs, lows, closings);
  const atrLine3 = multiplyBy(3, atrResult.atrLine);
  const highestHigh = mmax(highs, { period: PERIOD });
  const lowestLow = mmin(lows, { period: PERIOD });

  const exitLong = subtract(highestHigh, atrLine3);
  const exitShort = add(lowestLow, atrLine3);

  return {
    exitLong,
    exitShort,
  };
}
