// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { changeRatio, windowed } from '../../helper/window';
import { rsi } from './relativeStrengthIndex';

/**
 * Optional configuration of Connors RSI parameters.
 */
export interface ConnorsRSIConfig {
  rsiPeriod?: number;
  streakRsiPeriod?: number;
  percentRankPeriod?: number;
}

/**
 * The default configuration of Connors RSI.
 */
export const ConnorsRSIDefaultConfig: Required<ConnorsRSIConfig> = {
  rsiPeriod: 3,
  streakRsiPeriod: 2,
  percentRankPeriod: 100,
};

/**
 * Computes the up/down streak: the number of consecutive closes above the
 * previous close (positive), or below it (negative). An unchanged close
 * resets the streak to 0. The first value is NaN.
 *
 * @param closings closing values.
 * @return streak values.
 */
function streaks(closings: number[]): number[] {
  const result = new Array<number>(closings.length).fill(NaN);

  for (let i = 1; i < closings.length; i++) {
    const previous = i === 1 ? 0 : result[i - 1];

    if (closings[i] > closings[i - 1]) {
      result[i] = previous > 0 ? previous + 1 : 1;
    } else if (closings[i] < closings[i - 1]) {
      result[i] = previous < 0 ? previous - 1 : -1;
    } else {
      result[i] = 0;
    }
  }

  return result;
}

/**
 * Connors RSI (CRSI). It averages three components: the RSI of the
 * closings, the RSI of the up/down streak length, and the percent rank of
 * the one-bar rate of change.
 *
 * ```
 * Streak = consecutive closes up (+1, +2, ...) or down (-1, -2, ...), 0 when unchanged
 * PercentRank = percentage of the previous percentRankPeriod - 1 values of ROC(1) below the current ROC(1)
 * CRSI = (RSI(closings, rsiPeriod) + RSI(Streak, streakRsiPeriod) + PercentRank) / 3
 * ```
 *
 * Both RSIs start from a simple moving average (`seed: 'sma'`).
 *
 * Warm-up: the first `max(rsiPeriod, streakRsiPeriod + 1, percentRankPeriod)`
 * values are NaN.
 *
 * @example
 * ```TypeScript
 * import { crsi } from 'indicatorts';
 *
 * const defaultConfig = { rsiPeriod: 3, streakRsiPeriod: 2, percentRankPeriod: 100 };
 * const result = crsi(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = connorsRsi(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return connors rsi values.
 */
export function crsi(
  closings: number[],
  config: ConnorsRSIConfig = {}
): number[] {
  const { rsiPeriod, streakRsiPeriod, percentRankPeriod } = {
    ...ConnorsRSIDefaultConfig,
    ...config,
  };

  const priceRsi = rsi(closings, { period: rsiPeriod, seed: 'sma' });
  // The streak starts at the second bar, so its RSI is computed from there.
  const streakRsi = [
    NaN,
    ...rsi(streaks(closings).slice(1), {
      period: streakRsiPeriod,
      seed: 'sma',
    }),
  ].slice(0, closings.length);
  const percentRank = windowed(
    changeRatio(closings, 1),
    percentRankPeriod,
    (window) => {
      const current = window[window.length - 1];
      const below = window.filter((value) => value < current).length;
      return (below * 100) / (percentRankPeriod - 1);
    }
  );

  return closings.map(
    (_, i) => (priceRsi[i] + streakRsi[i] + percentRank[i]) / 3
  );
}

// Export full name
export { crsi as connorsRsi };
