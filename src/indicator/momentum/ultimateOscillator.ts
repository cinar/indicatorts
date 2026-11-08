// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  checkSameLength,
  divide,
  min,
  shiftRightAndFillBy,
  subtract,
} from '../../helper/numArray';
import { msum } from '../trend/movingSum';
import { tr } from '../volatility/trueRange';

/**
 * Optional configuration of Ultimate Oscillator parameters.
 */
export interface UOConfig {
  shortPeriod?: number;
  middlePeriod?: number;
  longPeriod?: number;
}

/**
 * The default configuration of Ultimate Oscillator.
 */
export const UODefaultConfig: Required<UOConfig> = {
  shortPeriod: 7,
  middlePeriod: 14,
  longPeriod: 28,
};

/**
 * Ultimate Oscillator (UO).
 *
 * BP = Closing - Min(Low, Prior Close)
 * TR = Max(High - Low, Abs(High - Prior Close), Abs(Low - Prior Close))
 *
 * Average7 = Sum(BP, 7) / Sum(TR, 7)
 * Average14 = Sum(BP, 14) / Sum(TR, 14)
 * Average28 = Sum(BP, 28) / Sum(TR, 28)
 *
 * UO = 100 * ((4 * Average7) + (2 * Average14) + Average28) / (4 + 2 + 1)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return ultimate oscillator values.
 */
export function uo(
  highs: number[],
  lows: number[],
  closings: number[],
  config: UOConfig = {}
): number[] {
  checkSameLength(highs, lows, closings);

  const { shortPeriod, middlePeriod, longPeriod } = {
    ...UODefaultConfig,
    ...config,
  };

  const len = closings.length;
  if (len === 0) {
    return [];
  }

  const priorClose = shiftRightAndFillBy(1, closings[0], closings);
  const minLowPriorClose = min(lows, priorClose);
  const buyingPressure = subtract(closings, minLowPriorClose);
  const trueRange = tr(highs, lows, closings);

  const bpSumShort = msum(buyingPressure, { period: shortPeriod });
  const trSumShort = msum(trueRange, { period: shortPeriod });

  const bpSumMiddle = msum(buyingPressure, { period: middlePeriod });
  const trSumMiddle = msum(trueRange, { period: middlePeriod });

  const bpSumLong = msum(buyingPressure, { period: longPeriod });
  const trSumLong = msum(trueRange, { period: longPeriod });

  const avgShortRaw = divide(bpSumShort, trSumShort);
  const avgMiddleRaw = divide(bpSumMiddle, trSumMiddle);
  const avgLongRaw = divide(bpSumLong, trSumLong);

  const avgShort = avgShortRaw.map((val, i) => (trSumShort[i] === 0 ? 0 : val));
  const avgMiddle = avgMiddleRaw.map((val, i) =>
    trSumMiddle[i] === 0 ? 0 : val
  );
  const avgLong = avgLongRaw.map((val, i) => (trSumLong[i] === 0 ? 0 : val));

  const result = new Array<number>(len);
  for (let i = 0; i < len; i++) {
    result[i] =
      (100 * (4 * avgShort[i] + 2 * avgMiddle[i] + avgLong[i])) / 7;
  }

  return result;
}

// Export full name
export { uo as ultimateOscillator };
