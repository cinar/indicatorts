// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of PriceRateofChange parameters.
 */
export interface PriceRateofChangeConfig {
  period?: number;
}

/**
 * The default configuration of PriceRateofChange.
 */
export const PriceRateofChangeDefaultConfig: Required<PriceRateofChangeConfig> =
  {
    period: 3,
  };

/**
 * Price Rate of Change (ROC).
 * @param values values array.
 * @return ROC values.
 */
export function roc(
  values: number[],
  config: PriceRateofChangeConfig = {}
): number[] {
  const { period } = { ...PriceRateofChangeDefaultConfig, ...config };
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
