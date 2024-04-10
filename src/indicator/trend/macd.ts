// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { subtract } from '../../helper/numArray';
import { ema } from './ema';

export interface MacdResult {
  macdLine: number[];
  signalLine: number[];
}

/**
 * Optional configuration of Macd parameters.
 */
export interface MacdConfig {
  fast?: number;
  slow?: number;
  signal?: number;
}

/**
 * The default configuration of Macd.
 */
export const MacdDefaultConfig: Required<MacdConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
};

/**
 * Moving Average Convergence Divergence (MACD).
 *
 * MACD = 12-Period EMA - 26-Period EMA.
 * Signal = 9-Period EMA of MACD.
 *
 * @param closings closing values.
 * @param config configuration.
 * @return macd result.
 */
export function macd(closings: number[], config: MacdConfig = {}): MacdResult {
  const { fast, slow, signal } = {
    ...MacdDefaultConfig,
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
