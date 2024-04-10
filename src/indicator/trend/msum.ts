// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of moving sum parameters.
 */
export interface MSUMConfig {
  period?: number;
}

/**
 * The default configuration of moving sum.
 */
export const MSUMDefaultConfig: Required<MSUMConfig> = {
  period: 4,
};

/**
 * Moving sum of the given values.
 * @param values values array.
 * @param config configuration.
 * @return sum values.
 */
export function msum(values: number[], config: MSUMConfig = {}): number[] {
  const { period } = { ...MSUMDefaultConfig, ...config };
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
