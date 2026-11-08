// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { mfm } from './moneyFlowMultiplier';

/**
 * Money Flow Volume (MFV). It is the volume weighted by the Money Flow
 * Multiplier, the position of the close within the bar's range.
 *
 * ```
 * MFV = MFM * Volume
 * ```
 *
 * @example
 * ```TypeScript
 * import { mfv } from 'indicatorts';
 *
 * const result = mfv(highs, lows, closings, volumes);
 *
 * // Alternatively:
 * // const result = moneyFlowVolume(highs, lows, closings, volumes);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return money flow volume values.
 */
export function mfv(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[]
): number[] {
  checkSameLength(highs, volumes);
  return mfm(highs, lows, closings).map(
    (multiplier, i) => multiplier * volumes[i]
  );
}

// Export full name
export { mfv as moneyFlowVolume };
