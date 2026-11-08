// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  divide,
  divideBy,
  shiftRightAndFillBy,
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
 * ```
 * Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2)
 * Box Ratio = ((Volume / 100000000) / (High - Low))
 * EMV(1) = Distance Moved / Box Ratio
 * EMV(14) = SMA(14, EMV(1))
 * ```
 *
 * @title Ease of Movement (EMV)
 * @example
 * ```TypeScript
 * import { emv } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = emv(highs, lows, volumes, defaultConfig);
 *
 * // Alternatively:
 * // const result = easeOfMovement(highs, lows, volumes, defaultConfig);
 * ```
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
  const midpoint = divideBy(2, add(highs, lows));
  const distanceMoved = subtract(
    midpoint,
    shiftRightAndFillBy(1, midpoint[0], midpoint)
  );
  const range = subtract(highs, lows);
  const boxRatio = divide(divideBy(100000000, volumes), range);

  // A bar with no range or no volume has no box ratio to move through, so
  // its EMV is 0 instead of NaN or Infinity.
  const emv1 = divide(distanceMoved, boxRatio).map((value, i) =>
    range[i] === 0 || volumes[i] === 0 ? 0 : value
  );
  const result = sma(emv1, { period });

  return result;
}

// Export full name
export { emv as easeOfMovement };
