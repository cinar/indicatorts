// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';

/**
 * Optional configuration of WilliamsR parameters.
 */
export interface WilliamsRConfig {
  period?: number;
}

/**
 * The default configuration of WilliamsR.
 */
export const WilliamsRDefaultConfig: Required<WilliamsRConfig> = {
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
export function williamsR(
  highs: number[],
  lows: number[],
  closings: number[],
  config: WilliamsRConfig = {}
): number[] {
  const { period } = { ...WilliamsRDefaultConfig, ...config };
  const highestHigh = mmax(highs, { period });
  const lowestLow = mmin(lows, { period });
  return multiplyBy(
    -100,
    divide(subtract(highestHigh, closings), subtract(highestHigh, lowestLow))
  );
}
