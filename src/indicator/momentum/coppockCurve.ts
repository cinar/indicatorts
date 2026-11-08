// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { changeRatio } from '../../helper/window';
import { wma } from '../trend/weightedMovingAverage';

/**
 * Optional configuration of Coppock Curve parameters.
 */
export interface CoppockCurveConfig {
  rocPeriod1?: number;
  rocPeriod2?: number;
  wmaPeriod?: number;
}

/**
 * The default configuration of Coppock Curve.
 */
export const CoppockCurveDefaultConfig: Required<CoppockCurveConfig> = {
  rocPeriod1: 14,
  rocPeriod2: 11,
  wmaPeriod: 10,
};

/**
 * Coppock Curve. It is a weighted moving average of the sum of two rates
 * of change, in percent, over different periods.
 *
 * ```
 * ROC(n) = (Close - Close n periods ago) / Close n periods ago * 100
 * Coppock Curve = WMA(ROC(rocPeriod1) + ROC(rocPeriod2), wmaPeriod)
 * ```
 *
 * Warm-up: the first `max(rocPeriod1, rocPeriod2) + wmaPeriod - 1` values
 * are NaN.
 *
 * @example
 * ```TypeScript
 * import { coppockCurve } from 'indicatorts';
 *
 * const defaultConfig = { rocPeriod1: 14, rocPeriod2: 11, wmaPeriod: 10 };
 * const result = coppockCurve(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return coppock curve values.
 */
export function coppockCurve(
  closings: number[],
  config: CoppockCurveConfig = {}
): number[] {
  const { rocPeriod1, rocPeriod2, wmaPeriod } = {
    ...CoppockCurveDefaultConfig,
    ...config,
  };
  const roc1 = changeRatio(closings, rocPeriod1);
  const roc2 = changeRatio(closings, rocPeriod2);

  return wma(
    roc1.map((value, i) => (value + roc2[i]) * 100),
    { period: wmaPeriod }
  );
}
