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
import { msum } from '../trend/movingSum';
import { typprice } from '../trend/typicalPrice';

/**
 * Optional configuration of MFI parameters.
 */
export interface MFIConfig {
  period?: number;
}

/**
 * The default configuration of MFI.
 */
export const MFIDefaultConfig: Required<MFIConfig> = {
  period: 14,
};

/**
 * The Money Flow Index (MFI) analyzes both the closing price and the volume
 * to measure to identify overbought and oversold states. It is similar to
 * the Relative Strength Index (RSI), but it also uses the volume.
 *
 * Raw Money Flow = Typical Price * Volume
 * Money Ratio = Positive Money Flow / Negative Money Flow
 * Money Flow Index = 100 - (100 / (1 + Money Ratio))
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @param config configuration.
 * @return money flow index values.
 */
export function mfi(
  highs: number[],
  lows: number[],
  closings: number[],
  volumes: number[],
  config: MFIConfig = {}
): number[] {
  const { period } = { ...MFIDefaultConfig, ...config };
  const rawMoneyFlow = multiply(typprice(highs, lows, closings), volumes);

  const signs = extractSigns(changes(1, rawMoneyFlow));
  const moneyFlow = multiply(signs, rawMoneyFlow);

  const positiveMoneyFlow = moneyFlow.map((value) => (value >= 0 ? value : 0));
  const negativeMoneyFlow = moneyFlow.map((value) => (value < 0 ? value : 0));

  const moneyRatio = divide(
    msum(positiveMoneyFlow, { period }),
    msum(multiplyBy(-1, negativeMoneyFlow), { period })
  );

  const result = addBy(100, multiplyBy(-100, pow(addBy(1, moneyRatio), -1)));

  return result;
}

// Export full name
export { mfi as moneyFlowIndex };
