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
 * ER = abs(Close[i] - Close[i-period]) / Sum(abs(Close[j] - Close[j-1]), period)
 * SC = (ER * (fastSC - slowSC) + slowSC)^2
 * KAMA[i] = KAMA[i-1] + SC * (Close[i] - KAMA[i-1])
 *
 * @param values values array.
 * @param config configuration.
 * @return KAMA values.
 */
export function kama(values: number[], config: KAMAConfig = {}): number[] {
  const { period, fast, slow } = { ...KAMADefaultConfig, ...config };
  const result = new Array<number>(values.length);
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
