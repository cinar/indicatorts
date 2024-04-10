// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';
import { atr } from './atr';

/**
 * Chandelier exit result object.
 */
export interface ChandelierExitResult {
  exitLong: number[];
  exitShort: number[];
}

/**
 * Optional configuration of ChandelierExit parameters.
 */
export interface ChandelierExitConfig {
  period?: number;
}

/**
 * The default configuration of ChandelierExit.
 */
export const ChandelierExitDefaultConfig: Required<ChandelierExitConfig> = {
  period: 22,
};

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
 * @param config configuration.
 * @return chandelier exit.
 */
export function chandelierExit(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ChandelierExitConfig = {}
): ChandelierExitResult {
  const { period } = { ...ChandelierExitDefaultConfig, ...config };
  const atrResult = atr(highs, lows, closings, { period });
  const atrLine3 = multiplyBy(3, atrResult.atrLine);
  const highestHigh = mmax(highs, { period });
  const lowestLow = mmin(lows, { period });

  const exitLong = subtract(highestHigh, atrLine3);
  const exitShort = add(lowestLow, atrLine3);

  return {
    exitLong,
    exitShort,
  };
}
