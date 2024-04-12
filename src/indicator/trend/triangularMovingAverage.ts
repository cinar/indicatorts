// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { sma } from './simpleMovingAverage';

/**
 * Optional configuration of TRIMA parameters.
 */
export interface TRIMAConfig {
  period?: number;
}

/**
 * The default configuration of TRIMA.
 */
export const TRIMADefaultConfig: Required<TRIMAConfig> = {
  period: 4,
};

/**
 * Trima function calculates the Triangular Moving Average (TRIMA).
 *
 * If period is even:
 *   TRIMA = SMA(period / 2, SMA((period / 2) + 1, values))
 * If period is odd:
 *   TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))
 *
 * @param values values array.
 * @param config configuration.
 * @return trima values.
 */
export function trima(values: number[], config: TRIMAConfig = {}): number[] {
  const { period } = { ...TRIMADefaultConfig, ...config };
  let n1 = 0;
  let n2 = 0;

  if (period % 2 === 0) {
    n1 = period / 2;
    n2 = n1 + 1;
  } else {
    n1 = (period + 1) / 2;
    n2 = n1;
  }

  const result = sma(sma(values, { period: n2 }), { period: n1 });

  return result;
}

// Export full name
export { trima as triangularMovingAverage };
