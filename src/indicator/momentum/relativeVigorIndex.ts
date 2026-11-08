// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { maskNaN, windowedSma } from '../../helper/window';

/**
 * RVI result object.
 */
export interface RVIResult {
  rvi: number[];
  signal: number[];
}

/**
 * Optional configuration of RVI parameters.
 */
export interface RVIConfig {
  period?: number;
  signalPeriod?: number;
}

/**
 * The default configuration of RVI.
 */
export const RVIDefaultConfig: Required<RVIConfig> = {
  period: 10,
  signalPeriod: 4,
};

/**
 * Applies the 4-bar FIR filter with the weights 1, 2, 2 and 1.
 *
 * @param values input values.
 * @return filtered values, NaN for the first 3 bars.
 */
function fir(values: number[]): number[] {
  return values.map((value, i) =>
    i < 3
      ? NaN
      : (value + 2 * values[i - 1] + 2 * values[i - 2] + values[i - 3]) / 6
  );
}

/**
 * Relative Vigor Index (RVI). It compares the close-to-open move with the
 * high-low range, both filtered with a 4-bar symmetric FIR filter and
 * averaged over `period` bars, and adds a simple moving average of the
 * ratio as the signal line.
 *
 * ```
 * FIR(x) = (x[i] + 2 * x[i-1] + 2 * x[i-2] + x[i-3]) / 6
 * RVI = SMA(FIR(Close - Open), period) / SMA(FIR(High - Low), period)
 * Signal = SMA(RVI, signalPeriod)
 * ```
 *
 * Warm-up: both outputs are NaN for the first
 * `3 + period - 1 + signalPeriod - 1` bars.
 *
 * @example
 * ```TypeScript
 * import { rvi } from 'indicatorts';
 *
 * const defaultConfig = { period: 10, signalPeriod: 4 };
 * const { rvi: rviLine, signal } = rvi(openings, highs, lows, closings, defaultConfig);
 *
 * // Alternatively:
 * // const { rvi: rviLine, signal } = relativeVigorIndex(openings, highs, lows, closings, defaultConfig);
 * ```
 * @param openings opening values.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return rvi result.
 */
export function rvi(
  openings: number[],
  highs: number[],
  lows: number[],
  closings: number[],
  config: RVIConfig = {}
): RVIResult {
  checkSameLength(openings, highs, lows, closings);

  const { period, signalPeriod } = { ...RVIDefaultConfig, ...config };
  const numerator = windowedSma(
    fir(closings.map((closing, i) => closing - openings[i])),
    period
  );
  const denominator = windowedSma(
    fir(highs.map((high, i) => high - lows[i])),
    period
  );
  const line = numerator.map((value, i) => value / denominator[i]);
  const signal = windowedSma(line, signalPeriod);

  return {
    rvi: maskNaN(line, signal),
    signal,
  };
}

// Export full name
export { rvi as relativeVigorIndex };
