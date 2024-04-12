// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
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
  const moneyFlowMultipler = divide(
    subtract(subtract(closings, lows), subtract(highs, closings)),
    subtract(highs, lows)
  );

  const moneyFlowVolume = multiply(moneyFlowMultipler, volumes);

  const result = divide(
    msum(moneyFlowVolume, { period }),
    msum(volumes, { period })
  );

  return result;
}

// Export full name
export { cmf as chaikinMoneyFlow };
