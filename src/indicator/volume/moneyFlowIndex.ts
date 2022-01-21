// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  addBy,
  changes,
  divide,
  extractSigns,
  multiply,
  multiplyBy,
  pow,
} from '../../helper/numArray';
import { msum } from '../trend/msum';
import { typicalPrice } from '../trend/typicalPrice';

/**
 * The Money Flow Index (MFI) analyzes both the closing price and the volume
 * to measure to identify overbought and oversold states. It is similar to
 * the Relative Strength Index (RSI), but it also uses the volume.
 *
 * Raw Money Flow = Typical Price * Volume
 * Money Ratio = Positive Money Flow / Negative Money Flow
 * Money Flow Index = 100 - (100 / (1 + Money Ratio))
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return money flow index values.
 */
export function moneyFlowIndex(
  period: number,
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[]
): number[] {
  const rawMoneyFlow = multiply(typicalPrice(highs, lows, closings), volumes);

  const signs = extractSigns(changes(1, rawMoneyFlow));
  const moneyFlow = multiply(signs, rawMoneyFlow);

  const positiveMoneyFlow = moneyFlow.map((value) => (value >= 0 ? value : 0));
  const negativeMoneyFlow = moneyFlow.map((value) => (value < 0 ? value : 0));

  const moneyRatio = divide(
    msum(period, positiveMoneyFlow),
    msum(period, negativeMoneyFlow)
  );

  const moneyFlowIndex = addBy(
    100,
    multiplyBy(-100, pow(addBy(1, moneyRatio), -1))
  );

  return moneyFlowIndex;
}

/**
 * Default money flow index with period 14.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return money flow index values.
 */
export function defaultMoneyFlowIndex(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[]
): number[] {
  return moneyFlowIndex(14, highs, lows, closings, volumes);
}
