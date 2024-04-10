// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of Sma parameters.
 */
export interface SmaConfig {
  period?: number;
}

/**
 * The default configuration of Sma.
 */
export const SmaDefaultConfig: Required<SmaConfig> = {
  period: 2,
};

/**
 * Simple moving average (SMA).
 * @param values values array.
 * @param config configuration.
 * @return SMA values.
 */
export function sma(values: number[], config: SmaConfig = {}): number[] {
  const { period } = { ...SmaDefaultConfig, ...config };
  const result = new Array<number>(values.length);
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];

    if (i >= period) {
      sum -= values[i - period];
      result[i] = sum / period;
    } else {
      result[i] = sum / (i + 1);
    }
  }

  return result;
}
