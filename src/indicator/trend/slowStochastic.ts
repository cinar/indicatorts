// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { maskNaN, windowedSma } from '../../helper/window';
import { stochastic } from './stochastic';

/**
 * Slow Stochastic result object.
 */
export interface SlowStochasticResult {
  k: number[];
  d: number[];
}

/**
 * Optional configuration of Slow Stochastic parameters.
 */
export interface SlowStochasticConfig {
  period?: number;
  kPeriod?: number;
  dPeriod?: number;
}

/**
 * The default configuration of Slow Stochastic.
 */
export const SlowStochasticDefaultConfig: Required<SlowStochasticConfig> = {
  period: 10,
  kPeriod: 3,
  dPeriod: 3,
};

/**
 * Slow Stochastic of a single series. It smooths the fast %K of the
 * single-series Stochastic with a simple moving average, and smooths the
 * result again to get %D.
 *
 * ```
 * Fast %K = (Value - Min(Value, period)) / (Max(Value, period) - Min(Value, period)) * 100
 * Slow %K = SMA(Fast %K, kPeriod)
 * Slow %D = SMA(Slow %K, dPeriod)
 * ```
 *
 * A window whose values are all equal has no range; Fast %K is 50 there.
 *
 * Warm-up: the first `period + kPeriod + dPeriod - 3` values of both
 * outputs are NaN.
 *
 * @example
 * ```TypeScript
 * import { slowStochastic } from 'indicatorts';
 *
 * const defaultConfig = { period: 10, kPeriod: 3, dPeriod: 3 };
 * const { k, d } = slowStochastic(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return slow stochastic result.
 */
export function slowStochastic(
  values: number[],
  config: SlowStochasticConfig = {}
): SlowStochasticResult {
  const { period, kPeriod, dPeriod } = {
    ...SlowStochasticDefaultConfig,
    ...config,
  };
  const fast = stochastic(values, { period, dPeriod: kPeriod });
  const d = windowedSma(fast.d, dPeriod);

  return {
    k: maskNaN(fast.d, d),
    d,
  };
}
