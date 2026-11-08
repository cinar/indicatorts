// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';

/**
 * Moving average convergence divergence (MACD) result object.
 */
export interface MACDResult {
  macdLine: number[];
  signalLine: number[];
}

/**
 * Optional configuration of MACD parameters.
 */
export interface MACDConfig {
  fast?: number;
  slow?: number;
  signal?: number;
}

/**
 * The default configuration of MACD.
 */
export const MACDDefaultConfig: Required<MACDConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
};

/**
 * Moving Average Convergence Divergence (MACD).
 *
 * ```
 * MACD = 12-Period EMA - 26-Period EMA.
 * Signal = 9-Period EMA of MACD.
 * ```
 *
 * @title Moving Average Convergence Divergence (MACD)
 * @example
 * ```TypeScript
 * import { macd } from 'indicatorts';
 *
 * const defaultConfig = { fast: 12, slow: 26, signal: 9 };
 * const { macdLine, signalLine } = macd(closings);
 *
 * // Alternatively:
 * // const { macdLine, signalLine } = movingAverageConvergenceDivergence(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return macd result.
 */
export function macd(closings: number[], config: MACDConfig = {}): MACDResult {
  const { fast, slow, signal } = {
    ...MACDDefaultConfig,
    ...config,
  };
  const emaFast = ema(closings, { period: fast });
  const emaSlow = ema(closings, { period: slow });

  const macdLine = subtract(emaFast, emaSlow);
  const signalLine = ema(macdLine, { period: signal });

  return {
    macdLine,
    signalLine,
  };
}

// Export full name
export { macd as movingAverageConvergenceDivergence };
