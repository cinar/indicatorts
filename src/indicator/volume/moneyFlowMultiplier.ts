// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { safeDivide } from '../../helper/window';

/**
 * Money Flow Multiplier (MFM). It is the position of the close within the
 * bar's range, on a -1 to 1 scale: -1 at the low, 0 at the middle and 1 at
 * the high.
 *
 * ```
 * MFM = ((Close - Low) - (High - Close)) / (High - Low)
 * ```
 *
 * A bar without a range (high equal to low) has an MFM of 0.
 *
 * @example
 * ```TypeScript
 * import { mfm } from 'indicatorts';
 *
 * const result = mfm(highs, lows, closings);
 *
 * // Alternatively:
 * // const result = moneyFlowMultiplier(highs, lows, closings);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return money flow multiplier values.
 */
export function mfm(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  checkSameLength(highs, lows, closings);
  return closings.map((closing, i) =>
    safeDivide(closing - lows[i] - (highs[i] - closing), highs[i] - lows[i], 0)
  );
}

// Export full name
export { mfm as moneyFlowMultiplier };
