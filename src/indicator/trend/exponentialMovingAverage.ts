// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of EMA parameters.
 */
export interface EMAConfig {
  period?: number;
}

/**
 * The default configuration of EMA.
 */
export const EMADefaultConfig: Required<EMAConfig> = {
  period: 12,
};

/**
 * Exponential moving average (EMA).
 * @param values values array.
 * @param config configuration.
 * @return EMA values.
 */
export function ema(values: number[], config: EMAConfig = {}): number[] {
  const { period } = { ...EMADefaultConfig, ...config };
  const result = new Array<number>(values.length);

  if (result.length > 0) {
    const kValue = 2 / (1 + period);
    const mValue = 1 - kValue;

    result[0] = values[0];

    for (let i = 1; i < result.length; i++) {
      result[i] = values[i] * kValue + result[i - 1] * mValue;
    }
  }

  return result;
}

// Export full name
export { ema as exponentialMovingAverage };
