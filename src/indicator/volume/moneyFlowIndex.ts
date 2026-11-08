// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength, multiply } from '../../helper/numArray';
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
 * ```
 * Raw Money Flow = Typical Price * Volume
 * Positive Money Flow = Sum of Raw Money Flow where Typical Price rose
 * Negative Money Flow = Sum of Raw Money Flow where Typical Price fell
 * Money Ratio = Positive Money Flow / Negative Money Flow
 * Money Flow Index = 100 - (100 / (1 + Money Ratio))
 * ```
 *
 * Bars whose typical price is unchanged from the previous bar, and the
 * first bar (which has no previous bar), contribute to neither flow.
 * When a window has no positive and no negative flow, the MFI is 50.
 *
 * @example
 * ```TypeScript
 * import { mfi } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = mfi(highs, lows, closings, volumes, defaultConfig);
 *
 * // Alternatively:
 * // const result = moneyFlowIndex(highs, lows, closings, volumes, defaultConfig);
 * ```
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
  checkSameLength(highs, lows, closings, volumes);
  const { period } = { ...MFIDefaultConfig, ...config };
  const typicalPrice = typprice(highs, lows, closings);
  const rawMoneyFlow = multiply(typicalPrice, volumes);

  const positiveMoneyFlow = new Array<number>(rawMoneyFlow.length);
  const negativeMoneyFlow = new Array<number>(rawMoneyFlow.length);

  for (let i = 0; i < rawMoneyFlow.length; i++) {
    const change = i === 0 ? 0 : typicalPrice[i] - typicalPrice[i - 1];
    positiveMoneyFlow[i] = change > 0 ? rawMoneyFlow[i] : 0;
    negativeMoneyFlow[i] = change < 0 ? rawMoneyFlow[i] : 0;
  }

  const positiveSum = msum(positiveMoneyFlow, { period });
  const negativeSum = msum(negativeMoneyFlow, { period });

  const result = new Array<number>(rawMoneyFlow.length);

  for (let i = 0; i < result.length; i++) {
    if (positiveSum[i] === 0 && negativeSum[i] === 0) {
      result[i] = 50;
    } else {
      // Dividing by a zero negative sum yields Infinity, and an MFI of 100.
      const moneyRatio = positiveSum[i] / negativeSum[i];
      result[i] = 100 - 100 / (1 + moneyRatio);
    }
  }

  return result;
}

// Export full name
export { mfi as moneyFlowIndex };
