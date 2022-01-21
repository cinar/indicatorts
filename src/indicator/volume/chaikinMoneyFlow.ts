// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiply, substract } from '../../helper/numArray';
import { msum } from '../trend/msum';

/**
 * Default period of CMF.
 */
export const CMF_DEFAULT_PERIOD = 20;

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
 * @returns cmf values.
 */
export function chaikinMoneyFlow(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[]
): number[] {
  const moneyFlowMultipler = divide(
    substract(substract(closings, lows), substract(highs, closings)),
    substract(highs, lows)
  );

  const moneyFlowVolume = multiply(moneyFlowMultipler, volumes);

  const cmf = divide(
    msum(CMF_DEFAULT_PERIOD, moneyFlowVolume),
    msum(CMF_DEFAULT_PERIOD, volumes)
  );

  return cmf;
}
