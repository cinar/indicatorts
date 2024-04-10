// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of RMA parameters.
 */
export interface RMAConfig {
  period?: number;
}

/**
 * The default configuration of RMA.
 */
export const RMADefaultConfig: Required<RMAConfig> = {
  period: 4,
};

/**
 * Rolling moving average (RMA).
 *
 * R[0] to R[p-1] is SMA(values)
 * R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
 *
 * @param values values array.
 * @param config configuration.
 * @returns RMA values.
 */
export function rma(values: number[], config: RMAConfig = {}): number[] {
  const { period } = { ...RMADefaultConfig, ...config };
  const result = new Array<number>(values.length);
  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    let count = i + 1;

    if (i < period) {
      sum += values[i];
    } else {
      sum = result[i - 1] * (period - 1) + values[i];
      count = period;
    }

    result[i] = sum / count;
  }

  return result;
}

// Export full name
export { rma as rollingMovingAverage };
