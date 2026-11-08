// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';

/**
 * On-Balance Volume (OBV). It is a cumulative momentum indicator that adds
 * the volume on up days and subtracts it on down days.
 *
 * ```
 *                   volume, if Closing > Closing-Prev
 * OBV = OBV-Prev +       0, if Closing = Closing-Prev
 *                  -volume, if Closing < Closing-Prev
 * ```
 *
 * @example
 * ```TypeScript
 * import {obv} from 'indicatorts';
 *
 * const result = obv(closings, volumes);
 *
 * // Alternatively:
 * // const result = onBalanceVolume(closings, volumes);
 * ```
 * @param closings closing values.
 * @param volumes volume values.
 * @return obv values.
 */
export function obv(closings: number[], volumes: number[]): number[] {
  checkSameLength(closings, volumes);

  const result = new Array<number>(closings.length);

  if (result.length === 0) {
    return result;
  }

  result[0] = 0;

  for (let i = 1; i < result.length; i++) {
    result[i] = result[i - 1];

    if (closings[i] > closings[i - 1]) {
      result[i] += volumes[i];
    } else if (closings[i] < closings[i - 1]) {
      result[i] -= volumes[i];
    }
  }

  return result;
}

// Export full name
export { obv as onBalanceVolume };
