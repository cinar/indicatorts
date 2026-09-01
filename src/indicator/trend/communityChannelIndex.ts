// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { abs, divide, multiplyBy, subtract } from '../../helper/numArray';
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
 * The Community Channel Index (CCI) is a momentum-based oscillator
 * used to help determine when an investment vehicle is reaching a
 * condition of being overbought or oversold.
 *
 * Moving Average = Sma(Period, Typical Price)
 * Mean Deviation = Sma(Period, Abs(Typical Price - Moving Average))
 * CMI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @returns cmi values.
 */
export function cci(
  highs: number[],
  lows: number[],
  closings: number[],
  config: CCIConfig = {}
): number[] {
  const { period } = { ...CCIDefaultConfig, ...config };
  const tp = typprice(highs, lows, closings);
  const ma = sma(tp, { period });
  const md = sma(abs(subtract(tp, ma)), { period });
  const resultRaw = divide(subtract(tp, ma), multiplyBy(0.015, md));

  // When the mean deviation is 0 (typical price exactly tracks its own
  // moving average, or there isn't enough data yet), CCI is treated as 0
  // instead of NaN (0 / 0).
  const result = resultRaw.map((value, i) => (md[i] === 0 ? 0 : value));
  return result;
}

// Export full name
export { cci as communityChannelIndex };
