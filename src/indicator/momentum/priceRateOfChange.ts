// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of ROC parameters.
 */
export interface ROCConfig {
  period?: number;
}

/**
 * The default configuration of ROC.
 */
export const ROCDefaultConfig: Required<ROCConfig> = {
  period: 3,
};

/**
 * Price Rate of Change (ROC).
 *
 * ROC[i] = 0 when i < period
 * ROC[i] = (close[i] / close[i-period] - 1) * 100 when i >= period
 *
 * @param values values array.
 * @return ROC values.
 */
export function roc(values: number[], config: ROCConfig = {}): number[] {
  const { period } = { ...ROCDefaultConfig, ...config };
  const result = new Array<number>(values.length);

  for (let i = 0; i < values.length; i++) {
    if (i < period) {
      // Setting indicator values to 0 for days before the 1st period.
      result[i] = 0;
    } else {
      result[i] = (values[i] / values[i - period] - 1) * 100;
    }
  }

  return result;
}

// Export full name
export { roc as priceRateOfChange };
