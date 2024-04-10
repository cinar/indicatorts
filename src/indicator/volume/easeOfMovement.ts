// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  changes,
  divide,
  divideBy,
  subtract,
} from '../../helper/numArray';
import { sma } from '../trend/simpleMovingAverage';

/**
 * Optional configuration of EMV parameters.
 */
export interface EMVConfig {
  period?: number;
}

/**
 * The default configuration of EMV.
 */
export const EMVDefaultConfig: Required<EMVConfig> = {
  period: 14,
};

/**
 * The Ease of Movement (EMV) is a volume based oscillator measuring
 * the ease of price movement.
 *
 * Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2)
 * Box Ratio = ((Volume / 100000000) / (High - Low))
 * EMV(1) = Distance Moved / Box Ratio
 * EMV(14) = SMA(14, EMV(1))
 *
 * @param highs high values.
 * @param lows low values.
 * @param volumes volume values.
 * @param config configuration.
 * @return ease of movement values.
 */
export function emv(
  highs: number[],
  lows: number[],
  volumes: number[],
  config: EMVConfig = {}
): number[] {
  const { period } = { ...EMVDefaultConfig, ...config };
  const distanceMoved = changes(1, divideBy(2, add(highs, lows)));
  const boxRatio = divide(divideBy(100000000, volumes), subtract(highs, lows));
  const result = sma(divide(distanceMoved, boxRatio), { period });

  return result;
}

// Export full name
export { emv as easeOfMovement };
