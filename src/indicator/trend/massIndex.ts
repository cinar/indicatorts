// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';
import { ema } from './ema';
import { msum } from './msum';

/**
 * The Mass Index (MI) uses the high-low range to identify trend reversals
 * based on range expansions.
 *
 * Singe EMA = EMA(9, Highs - Lows)
 * Double EMA = EMA(9, Single EMA)
 * Ratio = Single EMA / Double EMA
 * MI = Sum(25, Ratio)
 *
 * @param highs high values.
 * @param lows low values.
 * @returns mi values.
 */
export function massIndex(highs: number[], lows: number[]): number[] {
  const ema1 = ema(subtract(highs, lows), { period: 9 });
  const ema2 = ema(ema1, { period: 9 });
  const ratio = divide(ema1, ema2);
  const mi = msum(25, ratio);

  return mi;
}
