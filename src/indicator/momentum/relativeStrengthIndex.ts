// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { rma } from '../trend/rollingMovingAverage';
import { Seed } from '../types';

/**
 * Optional configuration of RSI parameters.
 */
export interface RSIConfig {
  period?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of RSI.
 */
export const RSIDefaultConfig: Required<RSIConfig> = {
  period: 14,
  seed: 'first',
};

/**
 * Relative Strength Index (RSI). It is a momentum indicator that measures the magnitude of
 * recent price changes to evaluate overbought and oversold conditions
 * using the given window period.
 *
 * ```
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 * ```
 *
 * Warm-up: the first bar counts as a gain and a loss of 0, so it is part of
 * the first averaging window, and every index has a value. TA-Lib starts from
 * the second bar (the first price change) and leaves the first `period`
 * results empty, so the early values differ and converge over the following
 * bars. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { rsi } from 'indicatorts';
 *
 * const defaultConfig = { period: 14 };
 * const result = rsi(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = relativeStrengthIndex(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return rsi values.
 */
export function rsi(closings: number[], config: RSIConfig = {}): number[] {
  const { period, seed } = { ...RSIDefaultConfig, ...config };

  if (closings.length === 0) {
    return [];
  }

  const gains = new Array<number>(closings.length);
  const losses = new Array<number>(closings.length);

  // With an SMA seed, the first bar has no price change and is left out of
  // the averages, as in TA-Lib.
  gains[0] = losses[0] = seed === 'sma' ? NaN : 0;

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

  const meanGains = rma(gains, { period, seed });
  const meanLosses = rma(losses, { period, seed });

  const rValue = new Array<number>(closings.length);
  const rsValue = new Array<number>(closings.length);

  rValue[0] = rsValue[0] = seed === 'sma' ? NaN : 0;

  for (let i = 1; i < closings.length; i++) {
    if (meanGains[i] === 0 && meanLosses[i] === 0) {
      rValue[i] = 50;
    } else {
      rsValue[i] = meanGains[i] / meanLosses[i];
      rValue[i] = 100 - 100 / (1 + rsValue[i]);
    }
  }

  return rValue;
}

// Export full name
export { rsi as relativeStrengthIndex };
