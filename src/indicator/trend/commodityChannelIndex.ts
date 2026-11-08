// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { sma } from './simpleMovingAverage';
import { typprice } from './typicalPrice';

/**
 * Optional configuration of CCI parameters.
 */
export interface CCIConfig {
  period?: number;
}

/**
 * The default configuration of CCI.
 */
export const CCIDefaultConfig: Required<CCIConfig> = {
  period: 20,
};

/**
 * The Commodity Channel Index (CCI) is a momentum-based oscillator
 * used to help determine when an investment vehicle is reaching a
 * condition of being overbought or oversold.
 *
 * Moving Average = Sma(Period, Typical Price)
 * Mean Deviation = Sum(Abs(Typical Price[k] - Moving Average)) / Period
 *   for k over the current window, using the current window's moving average
 * CCI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @returns cci values.
 */
export function cci(
  highs: number[],
  lows: number[],
  closings: number[],
  config: CCIConfig = {}
): number[] {
  checkSameLength(highs, lows, closings);
  const { period } = { ...CCIDefaultConfig, ...config };
  const tp = typprice(highs, lows, closings);
  const ma = sma(tp, { period });
  const result = new Array<number>(tp.length);

  for (let i = 0; i < tp.length; i++) {
    // Until a full period is available, the window holds the bars seen so
    // far, matching the partial window used by sma.
    const from = Math.max(0, i - period + 1);
    let sum = 0;
    for (let k = from; k <= i; k++) {
      sum += Math.abs(tp[k] - ma[i]);
    }
    const md = sum / (i - from + 1);

    // When the mean deviation is 0 (a flat window, or a single bar), CCI
    // is treated as 0 instead of NaN (0 / 0).
    result[i] = md === 0 ? 0 : (tp[i] - ma[i]) / (0.015 * md);
  }

  return result;
}

// Export full name
export { cci as commodityChannelIndex };
