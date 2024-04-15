// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { rma } from '../trend/rollingMovingAverage';

/**
 * Optional configuration of RSI parameters.
 */
export interface RSIConfig {
  period?: number;
}

/**
 * The default configuration of RSI.
 */
export const RSIDefaultConfig: Required<RSIConfig> = {
  period: 14,
};

/**
 * Relative Strength Index (RSI). It is a momentum indicator that measures the magnitude of
 * recent price changes to evaluate overbought and oversold conditions
 * using the given window period.
 *
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 *
 * @param closings closing values.
 * @param config configuration.
 * @return rsi values.
 */
export function rsi(closings: number[], config: RSIConfig = {}): number[] {
  const { period } = { ...RSIDefaultConfig, ...config };
  const gains = new Array<number>(closings.length);
  const losses = new Array<number>(closings.length);

  gains[0] = losses[0] = 0;

  for (let i = 1; i < closings.length; i++) {
    const difference = closings[i] - closings[i - 1];

    if (difference > 0) {
      gains[i] = difference;
      losses[i] = 0;
    } else {
      losses[i] = -difference;
      gains[i] = 0;
    }
  }

  const meanGains = rma(gains, { period });
  const meanLosses = rma(losses, { period });

  const rValue = new Array<number>(closings.length);
  const rsValue = new Array<number>(closings.length);

  rValue[0] = rsValue[0] = 0;

  for (let i = 1; i < closings.length; i++) {
    rsValue[i] = meanGains[i] / meanLosses[i];
    rValue[i] = 100 - 100 / (1 + rsValue[i]);
  }

  return rValue;
}

// Export full name
export { rsi as relativeStrengthIndex };
