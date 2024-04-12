// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { sma } from '../trend/simpleMovingAverage';

/**
 * Optional configuration of MSTD parameters.
 */
export interface MSTDConfig {
  period?: number;
}

/**
 * The default configuration of MSTD.
 */
export const MSTDDefaultConfig: Required<MSTDConfig> = {
  period: 4,
};

/**
 * Moving strandard deviation function.
 *
 * @param values value array.
 * @param config configuration.
 * @return std values.
 */
export function mstd(values: number[], config: MSTDConfig = {}): number[] {
  const { period } = { ...MSTDDefaultConfig, ...config };
  const result = new Array<number>(values.length);
  const averages = sma(values, { period });

  for (let i = 0; i < values.length; i++) {
    result[i] = 0;

    if (i >= period - 1) {
      let sum = 0;

      for (let k = i - (period - 1); k <= i; k++) {
        sum += (values[k] - averages[i]) * (values[k] - averages[i]);
      }

      result[i] = Math.sqrt(sum / period);
    }
  }

  return result;
}

// Export full name
export { mstd as movingStandardDeviation };
