// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply, subtract } from '../../helper/numArray';

/**
 * Accumulation/Distribution Indicator (A/D). Cumulative indicator
 * that uses volume and price to assess whether a stock is
 * being accumulated or distributed.
 *
 * MFM = ((Closing - Low) - (High - Closing)) / (High - Low)
 * MFV = MFM * Period Volume
 * AD = Previous AD + CMFV
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volume volume values.
 * @return ad values.
 */
export function ad(
  highs: number[],
  lows: number[],
  closings: number[],
  volume: number[]
): number[] {
  const mfm = divide(
    subtract(subtract(closings, lows), subtract(highs, closings)),
    subtract(highs, lows)
  );

  const mfv = multiply(mfm, volume);

  const result = new Array<number>(mfv.length);

  for (let i = 0; i < result.length; i++) {
    result[i] = mfv[i];
    if (i > 0) {
      result[i] += result[i - 1];
    }
  }

  return result;
}

// Export full name
export { ad as accumulationDistribution };
