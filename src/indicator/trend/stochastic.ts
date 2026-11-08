// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {
  maskNaN,
  safeDivide,
  windowedMax,
  windowedMin,
  windowedSma,
} from '../../helper/window';

/**
 * Stochastic result object.
 */
export interface StochasticResult {
  k: number[];
  d: number[];
}

/**
 * Optional configuration of Stochastic parameters.
 */
export interface StochasticConfig {
  period?: number;
  dPeriod?: number;
}

/**
 * The default configuration of Stochastic.
 */
export const StochasticDefaultConfig: Required<StochasticConfig> = {
  period: 10,
  dPeriod: 3,
};

/**
 * Stochastic of a single series. It places each value within the range of
 * the last `period` values, on a 0 to 100 scale, and smooths it with a
 * simple moving average. Unlike the Stochastic Oscillator (`stoch`), which
 * uses the highs, lows and closings, it works on any one series, such as
 * the MACD line in the Schaff Trend Cycle.
 *
 * ```
 * K = (Value - Min(Value, period)) / (Max(Value, period) - Min(Value, period)) * 100
 * D = SMA(K, dPeriod)
 * ```
 *
 * A window whose values are all equal has no range; K is 50 there.
 *
 * Warm-up: the first `period + dPeriod - 2` values of both K and D are NaN.
 *
 * @example
 * ```TypeScript
 * import { stochastic } from 'indicatorts';
 *
 * const defaultConfig = { period: 10, dPeriod: 3 };
 * const { k, d } = stochastic(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return stochastic result.
 */
export function stochastic(
  values: number[],
  config: StochasticConfig = {}
): StochasticResult {
  const { period, dPeriod } = { ...StochasticDefaultConfig, ...config };
  const highest = windowedMax(values, period);
  const lowest = windowedMin(values, period);
  const k = values.map(
    (value, i) =>
      safeDivide(value - lowest[i], highest[i] - lowest[i], 0.5) * 100
  );
  const d = windowedSma(k, dPeriod);

  return {
    k: maskNaN(k, d),
    d,
  };
}
