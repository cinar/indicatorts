// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { safeDivide, windowedSma, windowedStd } from '../../helper/window';

/**
 * Optional configuration of Z-Score parameters.
 */
export interface ZScoreConfig {
  period?: number;
}

/**
 * The default configuration of Z-Score.
 */
export const ZScoreDefaultConfig: Required<ZScoreConfig> = {
  period: 20,
};

/**
 * Z-Score. It is the number of standard deviations the value is from its
 * simple moving average over `period` bars.
 *
 * ```
 * Z-Score = (Value - SMA(values, period)) / StdDev(values, period)
 * ```
 *
 * The standard deviation is the population standard deviation. When every
 * value in the window is equal, the Z-Score is 0.
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { zScore } from 'indicatorts';
 *
 * const defaultConfig = { period: 20 };
 * const result = zScore(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return z-score values.
 */
export function zScore(values: number[], config: ZScoreConfig = {}): number[] {
  const { period } = { ...ZScoreDefaultConfig, ...config };
  const averages = windowedSma(values, period);
  const std = windowedStd(values, period);

  return values.map((value, i) => safeDivide(value - averages[i], std[i], 0));
}
