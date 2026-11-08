// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of KAMA parameters.
 */
export interface KAMAConfig {
  period?: number;
  fast?: number;
  slow?: number;
}

/**
 * The default configuration of KAMA.
 */
export const KAMADefaultConfig: Required<KAMAConfig> = {
  period: 10,
  fast: 2,
  slow: 30,
};

/**
 * Kaufman's Adaptive Moving Average (KAMA).
 *
 * ```
 * ER = abs(Close[i] - Close[i-period]) / Sum(abs(Close[j] - Close[j-1]), period)
 * SC = (ER * (fastSC - slowSC) + slowSC)^2
 * KAMA[i] = KAMA[i-1] + SC * (Close[i] - KAMA[i-1])
 * ```
 *
 * fastSC = 2 / (fast + 1), and slowSC = 2 / (slow + 1). Until a full period
 * is available, the first `period` values are the input values themselves,
 * and the first adaptive value (at index `period`) builds on
 * `values[period - 1]`. When the price did not move over the window, the
 * efficiency ratio is 0 instead of NaN (0 / 0).
 *
 * @title Kaufman's Adaptive Moving Average (KAMA)
 * @example
 * ```TypeScript
 * import { kama } from 'indicatorts';
 *
 * const defaultConfig = { period: 10, fast: 2, slow: 30 };
 * const result = kama(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = kaufmanAdaptiveMovingAverage(closings, defaultConfig);
 * ```
 * @param values values array.
 * @param config configuration.
 * @return KAMA values.
 */
export function kama(values: number[], config: KAMAConfig = {}): number[] {
  const { period, fast, slow } = { ...KAMADefaultConfig, ...config };
  const result = new Array<number>(values.length);

  if (values.length === 0) {
    return result;
  }

  const fastSC = 2 / (fast + 1);
  const slowSC = 2 / (slow + 1);

  result[0] = values[0];

  for (let i = 1; i < values.length; i++) {
    if (i < period) {
      result[i] = values[i];
      continue;
    }

    const direction = Math.abs(values[i] - values[i - period]);
    let volatility = 0;

    for (let j = 0; j < period; j++) {
      volatility += Math.abs(values[i - j] - values[i - j - 1]);
    }

    const er = volatility === 0 ? 0 : direction / volatility;
    const sc = Math.pow(er * (fastSC - slowSC) + slowSC, 2);

    result[i] = result[i - 1] + sc * (values[i] - result[i - 1]);
  }

  return result;
}

// Export full name
export { kama as kaufmanAdaptiveMovingAverage };
