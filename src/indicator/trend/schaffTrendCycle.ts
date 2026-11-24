// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { windowedMax, windowedMin } from '../../helper/window';
import { ema } from './exponentialMovingAverage';

/**
 * Optional configuration of STC parameters.
 */
export interface STCConfig {
  fast?: number;
  slow?: number;
  kPeriod?: number;
  dPeriod?: number;
}

/**
 * The default configuration of STC.
 */
export const STCDefaultConfig: Required<STCConfig> = {
  fast: 23,
  slow: 50,
  kPeriod: 10,
  dPeriod: 3,
};

/**
 * Normalizes values to a 0 to 100 scale against the high and low of the last
 * `kPeriod` bars and smooths the result exponentially.
 *
 * @param values input values.
 * @param kPeriod stochastic window length.
 * @param dPeriod smoothing period (`factor = 2 / (dPeriod + 1)`).
 * @return smoothed stochastic values.
 */
function smoothedStochastic(
  values: number[],
  kPeriod: number,
  dPeriod: number
): number[] {
  const highest = windowedMax(values, kPeriod);
  const lowest = windowedMin(values, kPeriod);
  const factor = 2 / (dPeriod + 1);
  const result = new Array<number>(values.length).fill(NaN);

  let started = false;
  let smoothed = 0;

  for (let i = 0; i < values.length; i++) {
    if (Number.isNaN(highest[i])) {
      continue;
    }

    const range = highest[i] - lowest[i];
    const raw = range > 0 ? ((values[i] - lowest[i]) * 100) / range : smoothed;

    if (started) {
      smoothed += factor * (raw - smoothed);
    } else {
      smoothed = raw;
      started = true;
    }

    result[i] = smoothed;
  }

  return result;
}

/**
 * Schaff Trend Cycle (STC). It applies a stochastic normalization to MACD
 * twice, smoothing the result of each pass exponentially, as in Doug Schaff's
 * definition and TA-Lib `STC`.
 *
 * ```
 * MACD = EMA(closings, fast) - EMA(closings, slow)
 * %K1 = 100 * (MACD - Min(MACD, kPeriod)) / (Max(MACD, kPeriod) - Min(MACD, kPeriod))
 * PF  = PF[previous] + factor * (%K1 - PF[previous])
 * %K2 = 100 * (PF - Min(PF, kPeriod)) / (Max(PF, kPeriod) - Min(PF, kPeriod))
 * STC = STC[previous] + factor * (%K2 - STC[previous])
 * factor = 2 / (dPeriod + 1)
 * ```
 *
 * Both EMAs start from the simple moving average of the bars ending at the
 * slow EMA's first value, as in TA-Lib `STC`. The default `dPeriod` of 3
 * gives Schaff's factor of 0.5. Each smoothed series starts from its first
 * `%K` value; when the window's maximum equals its minimum, the previous
 * smoothed value is kept (0 if there is none yet).
 *
 * Warm-up: the first `slow - 1 + 2 * (kPeriod - 1)` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { stc } from 'indicatorts';
 *
 * const defaultConfig = { fast: 23, slow: 50, kPeriod: 10, dPeriod: 3 };
 * const result = stc(closings, defaultConfig);
 *
 * // Alternatively:
 * // const result = schaffTrendCycle(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return stc values.
 */
export function stc(closings: number[], config: STCConfig = {}): number[] {
  const { fast, slow, kPeriod, dPeriod } = { ...STCDefaultConfig, ...config };
  const fastInput = closings.map((value, i) => (i < slow - fast ? NaN : value));
  const fastEma = ema(fastInput, { period: fast, seed: 'sma' });
  const slowEma = ema(closings, { period: slow, seed: 'sma' });
  const macd = fastEma.map((value, i) => value - slowEma[i]);
  const first = smoothedStochastic(macd, kPeriod, dPeriod);

  return smoothedStochastic(first, kPeriod, dPeriod);
}

// Export full name
export { stc as schaffTrendCycle };
