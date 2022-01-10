// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {add, multiplyBy, substract} from '../../helper/numArray';
import {mmax} from '../trend/mmax';
import {mmin} from '../trend/mmin';
import {atr} from './atr';

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
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {ChandelierExitResult} chandelier exit.
 */
export function chandelierExit(
    highs: number[],
    lows: number[],
    closings: number[],
): ChandelierExitResult {
  const atrResult = atr(PERIOD, highs, lows, closings);
  const atrLine3 = multiplyBy(3, atrResult.atrLine);
  const highestHigh = mmax(PERIOD, highs);
  const lowestLow = mmin(PERIOD, lows);

  const exitLong = substract(highestHigh, atrLine3);
  const exitShort = add(lowestLow, atrLine3);

  return {
    exitLong,
    exitShort,
  };
}
