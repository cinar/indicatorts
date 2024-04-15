// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { mmax } from '../trend/movingMax';
import { mmin } from '../trend/movingMin';
import { atr } from './averageTrueRange';

/**
 * Chandelier exit result object.
 */
export interface CEResult {
  long: number[];
  short: number[];
}

/**
 * Optional configuration of Chandelier exit parameters.
 */
export interface CEConfig {
  period?: number;
}

/**
 * The default configuration of Chandelier exit.
 */
export const CEDefaultConfig: Required<CEConfig> = {
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
export function ce(
  highs: number[],
  lows: number[],
  closings: number[],
  config: CEConfig = {}
): CEResult {
  const { period } = { ...CEDefaultConfig, ...config };
  const atrResult = atr(highs, lows, closings, { period });
  const atrLine3 = multiplyBy(3, atrResult.atrLine);
  const highestHigh = mmax(highs, { period });
  const lowestLow = mmin(lows, { period });

  const long = subtract(highestHigh, atrLine3);
  const short = add(lowestLow, atrLine3);

  return {
    long,
    short,
  };
}

// Export full name
export { ce as chandelierExit };
