// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { add, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of TEMA parameters.
 */
export interface TEMAConfig {
  period?: number;
}

/**
 * The default configuration of TEMA.
 */
export const TEMADefaultConfig: Required<TEMAConfig> = {
  period: 2,
};

/**
 * Tema calculates the Triple Exponential Moving Average (TEMA).
 *
 * ```
 * TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
 * EMA1 = EMA(values)
 * EMA2 = EMA(EMA1)
 * EMA3 = EMA(EMA2)
 * ```
 *
 * Based on [Triple Exponential Moving Average (TEMA)](https://www.investopedia.com/terms/t/triple-exponential-moving-average.asp).
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { tema } from 'indicatorts';
 *
 * const defaultConfig = { period: 2 };
 * const result = tema(values, defaultConfig);
 *
 * // Alternatively:
 * // const result = tripleExponentialMovingAverage(values, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return tema values.
 */
export function tema(values: number[], config: TEMAConfig = {}): number[] {
  const { period } = { ...TEMADefaultConfig, ...config };
  const ema1 = ema(values, { period });
  const ema2 = ema(ema1, { period });
  const ema3 = ema(ema2, { period });

  const result = add(subtract(multiplyBy(3, ema1), multiplyBy(3, ema2)), ema3);

  return result;
}

// Export full name
export { tema as tripleExponentialMovingAverage };
