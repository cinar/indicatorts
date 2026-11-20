// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { trueRanges } from '../../helper/trueRanges';
import { rma } from './rollingMovingAverage';

/**
 * Average directional index result.
 */
export interface ADXResult {
  plusDi: number[];
  minusDi: number[];
  adx: number[];
}

/**
 * Optional configuration of average directional index parameters.
 */
export interface ADXConfig {
  period?: number;
}

/**
 * The default configuration of average directional index.
 */
export const ADXDefaultConfig: Required<ADXConfig> = {
  period: 14,
};

/**
 * Computes a directional indicator from the smoothed directional movement
 * and the smoothed true range. A smoothed true range of 0 means there was no
 * price movement, so the indicator is 0 instead of NaN (0 / 0).
 *
 * @param movements smoothed directional movement values.
 * @param ranges smoothed true range values.
 * @param period window period.
 * @return directional indicator values.
 */
function directionalIndicator(
  movements: number[],
  ranges: number[],
  period: number
): number[] {
  return movements.map((movement, i) => {
    if (i < period) {
      return NaN;
    }

    return ranges[i] === 0 ? 0 : (100 * movement) / ranges[i];
  });
}

/**
 * Average Directional Index (ADX). It measures the strength of a trend,
 * regardless of its direction, from how far the highs and lows move beyond
 * the previous bar's range. The plus and minus directional indicators
 * (+DI and -DI) measure the upward and the downward movement separately.
 *
 * ```
 * Up Move = High - Previous High
 * Down Move = Previous Low - Low
 * +DM = Up Move, if Up Move > Down Move and Up Move > 0, else 0
 * -DM = Down Move, if Down Move > Up Move and Down Move > 0, else 0
 * TR = Max(High - Low, Abs(High - Previous Close), Abs(Low - Previous Close))
 *
 * +DI = 100 * RMA(+DM, period) / RMA(TR, period)
 * -DI = 100 * RMA(-DM, period) / RMA(TR, period)
 * DX = 100 * Abs(+DI - -DI) / (+DI + -DI)
 * ADX = RMA(DX, period)
 * ```
 *
 * RMA is Wilder's smoothing, started from the average of the first `period`
 * values (`seed: 'sma'`). The first bar has no previous bar, so its +DM, -DM
 * and TR are 0. +DI and -DI start at index `period`, after `period` price
 * changes, and ADX at index `2 * period - 1`; the earlier values are NaN.
 * This matches TA-Lib's PLUS_DI, MINUS_DI and ADX.
 *
 * A smoothed true range of 0, as in a flat market, gives a +DI and -DI of 0,
 * and a DX of 0 when both are 0.
 *
 * Based on [Average Directional Index](https://school.stockcharts.com/doku.php?id=technical_indicators:average_directional_index_adx)
 *
 * @example
 * ```TypeScript
 * import { adx } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = adx(highs, lows, closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = averageDirectionalIndex(highs, lows, closings, defaultConfig);
 * ```
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return average directional index result.
 */
export function adx(
  highs: number[],
  lows: number[],
  closings: number[],
  config: ADXConfig = {}
): ADXResult {
  checkSameLength(highs, lows, closings);

  const { period } = { ...ADXDefaultConfig, ...config };
  const upMoves = highs.map((high, i) => (i === 0 ? 0 : high - highs[i - 1]));
  const downMoves = lows.map((low, i) => (i === 0 ? 0 : lows[i - 1] - low));

  const plusDm = upMoves.map((upMove, i) =>
    upMove > downMoves[i] && upMove > 0 ? upMove : 0
  );
  const minusDm = downMoves.map((downMove, i) =>
    downMove > upMoves[i] && downMove > 0 ? downMove : 0
  );
  const tr = trueRanges(highs, lows, closings).map((range, i) =>
    i === 0 ? 0 : range
  );

  const smoothedTr = rma(tr, { period, seed: 'sma' });
  const plusDi = directionalIndicator(
    rma(plusDm, { period, seed: 'sma' }),
    smoothedTr,
    period
  );
  const minusDi = directionalIndicator(
    rma(minusDm, { period, seed: 'sma' }),
    smoothedTr,
    period
  );

  const dx = plusDi.map((plus, i) => {
    const sum = plus + minusDi[i];
    return sum === 0 ? 0 : (100 * Math.abs(plus - minusDi[i])) / sum;
  });

  return {
    plusDi,
    minusDi,
    adx: rma(dx, { period, seed: 'sma' }),
  };
}

// Export full name
export { adx as averageDirectionalIndex };
