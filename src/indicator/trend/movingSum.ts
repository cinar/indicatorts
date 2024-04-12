// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of moving sum parameters.
 */
export interface MSumConfig {
  period?: number;
}

/**
 * The default configuration of moving sum.
 */
export const MSumDefaultConfig: Required<MSumConfig> = {
  period: 4,
};

/**
 * Moving sum of the given values.
 * @param values values array.
 * @param config configuration.
 * @return sum values.
 */
export function msum(values: number[], config: MSumConfig = {}): number[] {
  const { period } = { ...MSumDefaultConfig, ...config };
  const result = new Array<number>(values.length);
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    sum += values[i];

    if (i >= period) {
      sum -= values[i - period];
    }

    result[i] = sum;
  }

  return result;
}

// Export full name
export { msum as movingSum };
