// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';

/**
 * Weighted Close. It averages the high, the low and the close, counting the
 * close twice.
 *
 * ```
 * Weighted Close = (High + Low + (Close * 2)) / 4
 * ```
 *
 * @example
 * ```TypeScript
 * import { weightedClose } from 'indicatorts';
 *
 * const result = weightedClose(highs, lows, closings);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return weighted close values.
 */
export function weightedClose(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  checkSameLength(highs, lows, closings);
  return closings.map((closing, i) => (highs[i] + lows[i] + closing * 2) / 4);
}
