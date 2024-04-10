// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { mmax } from '../trend/movingMax';
import { mmin } from '../trend/movingMin';

/**
 * Optional configuration of Williams R parameters.
 */
export interface WillrConfig {
  period?: number;
}

/**
 * The default configuration of Williams R.
 */
export const WillrDefaultConfig: Required<WillrConfig> = {
  period: 14,
};

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
 * @param config configuration.
 * @return wr values.
 */
export function willr(
  highs: number[],
  lows: number[],
  closings: number[],
  config: WillrConfig = {}
): number[] {
  const { period } = { ...WillrDefaultConfig, ...config };
  const highestHigh = mmax(highs, { period });
  const lowestLow = mmin(lows, { period });
  const result = multiplyBy(
    -100,
    divide(subtract(highestHigh, closings), subtract(highestHigh, lowestLow))
  );

  return result;
}

// Export full name
export { willr as williamsR };
