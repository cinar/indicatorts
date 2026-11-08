// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { safeDivide } from '../../helper/window';

/**
 * Internal Bar Strength (IBS). It is the position of the close within the
 * bar's high-low range, on a 0 to 1 scale: 0 at the low and 1 at the high.
 *
 * ```
 * IBS = (Close - Low) / (High - Low)
 * ```
 *
 * A bar without a range (high equal to low) has an IBS of 0.
 *
 * @example
 * ```TypeScript
 * import { ibs } from 'indicatorts';
 *
 * const result = ibs(highs, lows, closings);
 *
 * // Alternatively:
 * // const result = internalBarStrength(highs, lows, closings);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return ibs values.
 */
export function ibs(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  checkSameLength(highs, lows, closings);
  return closings.map((closing, i) =>
    safeDivide(closing - lows[i], highs[i] - lows[i], 0)
  );
}

// Export full name
export { ibs as internalBarStrength };
