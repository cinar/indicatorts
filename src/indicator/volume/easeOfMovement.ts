// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  changes,
  divide,
  divideBy,
  subtract,
} from '../../helper/numArray';
import { sma } from '../trend/sma';

/**
 * Default period for EMV.
 */
export const EMV_DEFAULT_PERIOD = 14;

/**
 * The Ease of Movement (EMV) is a volume based oscillator measuring
 * the ease of price movement.
 *
 * Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2)
 * Box Ratio = ((Volume / 100000000) / (High - Low))
 * EMV(1) = Distance Moved / Box Ratio
 * EMV(14) = SMA(14, EMV(1))
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param volumes volume values.
 * @return ease of movement values.
 */
export function easeOfMovement(
  period: number,
  highs: number[],
  lows: number[],
  volumes: number[]
): number[] {
  const distanceMoved = changes(1, divideBy(2, add(highs, lows)));
  const boxRatio = divide(divideBy(100000000, volumes), subtract(highs, lows));
  const emv = sma(period, divide(distanceMoved, boxRatio));
  return emv;
}

/**
 * The default Ease of Movement with the default period of 14.
 *
 * @param highs high values.
 * @param lows low values.
 * @param volumes volume values.
 * @return ease of movement values.
 */
export function defaultEaseOfMovement(
  highs: number[],
  lows: number[],
  volumes: number[]
): number[] {
  return easeOfMovement(EMV_DEFAULT_PERIOD, highs, lows, volumes);
}
