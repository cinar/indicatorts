// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply, subtract } from '../../helper/numArray';
import { msum } from '../trend/movingSum';

/**
 * Optional configuration of CMF parameters.
 */
export interface CMFConfig {
  period?: number;
}

/**
 * The default configuration of CMF.
 */
export const CMFDefaultConfig: Required<CMFConfig> = {
  period: 20,
};

/**
 * The Chaikin Money Flow (CMF) measures the amount of money flow volume
 * over a given period.
 *
 * Money Flow Multiplier = ((Closing - Low) - (High - Closing)) / (High - Low)
 * Money Flow Volume = Money Flow Multiplier * Volume
 * Chaikin Money Flow = Sum(20, Money Flow Volume) / Sum(20, Volume)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @returns cmf values.
 */
export function cmf(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[],
  config: CMFConfig = {}
): number[] {
  const { period } = { ...CMFDefaultConfig, ...config };
  const range = subtract(highs, lows);
  const moneyFlowMultiplerRaw = divide(
    subtract(subtract(closings, lows), subtract(highs, closings)),
    range
  );

  // When the high and low are equal, there is no price movement within
  // the bar, so the money flow multiplier is treated as 0 instead of
  // NaN (0 / 0).
  const moneyFlowMultipler = moneyFlowMultiplerRaw.map((value, i) =>
    range[i] === 0 ? 0 : value
  );

  const moneyFlowVolume = multiply(moneyFlowMultipler, volumes);

  const volumeSum = msum(volumes, { period });
  const resultRaw = divide(msum(moneyFlowVolume, { period }), volumeSum);

  // When the volume sum for a window is 0 (no trading volume), treat the
  // Chaikin Money Flow as 0 instead of NaN (0 / 0).
  const result = resultRaw.map((value, i) => (volumeSum[i] === 0 ? 0 : value));

  return result;
}

// Export full name
export { cmf as chaikinMoneyFlow };
