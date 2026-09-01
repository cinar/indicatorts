// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';

/**
 * The Balance of Power (BOP) function calculates the strength of buying and
 * selling pressure. Positive value indicates an upward trend, and negative
 * value indicates a downward trend. Zero indicates a balance between
 * the two.
 *
 * BOP = (Closing - Opening) / (High - Low)
 *
 * @param openings opening values.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return balance of power values.
 */
export function bop(
  openings: number[],
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  const range = subtract(highs, lows);
  const resultRaw = divide(subtract(closings, openings), range);

  // When the high and low are equal, there is no price movement within
  // the bar, so balance of power is treated as 0 (balanced) instead of
  // NaN (0 / 0).
  return resultRaw.map((value, i) => (range[i] === 0 ? 0 : value));
}

// Export full name
export { bop as balanceOfPower };
