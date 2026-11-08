// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { changeRatio, windowedSma } from '../../helper/window';

/**
 * The rate of change period, moving average period and weight of each
 * Special K component.
 */
const COMPONENTS: [number, number, number][] = [
  [10, 10, 1],
  [15, 10, 2],
  [20, 10, 3],
  [30, 15, 4],
  [40, 50, 1],
  [65, 65, 2],
  [75, 75, 3],
  [100, 100, 4],
  [195, 130, 1],
  [265, 130, 2],
  [390, 130, 3],
  [530, 195, 4],
];

/**
 * Martin Pring's Special K. It is a weighted sum of twelve rates of change,
 * from 10 to 530 bars, each smoothed with a simple moving average. The
 * rates of change are ratios, not percentages.
 *
 * ```
 * ROC(n) = (Close - Close n periods ago) / Close n periods ago
 * Special K = 1 * SMA(ROC(10), 10)   + 2 * SMA(ROC(15), 10)   + 3 * SMA(ROC(20), 10)   + 4 * SMA(ROC(30), 15)
 *           + 1 * SMA(ROC(40), 50)   + 2 * SMA(ROC(65), 65)   + 3 * SMA(ROC(75), 75)   + 4 * SMA(ROC(100), 100)
 *           + 1 * SMA(ROC(195), 130) + 2 * SMA(ROC(265), 130) + 3 * SMA(ROC(390), 130) + 4 * SMA(ROC(530), 195)
 * ```
 *
 * Warm-up: the first 724 values (530 + 195 - 1) are NaN.
 *
 * @example
 * ```TypeScript
 * import { specialK } from 'indicatorts';
 *
 * const result = specialK(closings);
 *
 * // Alternatively:
 * // const result = pringsSpecialK(closings);
 * ```
 * @param closings closing values.
 * @return special k values.
 */
export function specialK(closings: number[]): number[] {
  const parts = COMPONENTS.map(([rocPeriod, smaPeriod, weight]) =>
    windowedSma(changeRatio(closings, rocPeriod), smaPeriod).map(
      (value) => value * weight
    )
  );

  return closings.map((_, i) => parts.reduce((sum, part) => sum + part[i], 0));
}

// Export full name
export { specialK as pringsSpecialK };
