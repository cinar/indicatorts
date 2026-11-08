// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { windowedSma } from '../../helper/window';
import { ema } from './exponentialMovingAverage';

/**
 * Envelope result object.
 */
export interface EnvelopeResult {
  upper: number[];
  middle: number[];
  lower: number[];
}

/**
 * Optional configuration of Envelope parameters.
 */
export interface EnvelopeConfig {
  period?: number;
  /**
   * Distance of the bands from the middle line, in percent.
   */
  percentage?: number;
  /**
   * Moving average of the middle line: `'sma'` (default) or `'ema'`. The
   * EMA starts from the simple moving average of the first `period` values.
   */
  ma?: 'sma' | 'ema';
}

/**
 * The default configuration of Envelope.
 */
export const EnvelopeDefaultConfig: Required<EnvelopeConfig> = {
  period: 20,
  percentage: 20,
  ma: 'sma',
};

/**
 * Moving Average Envelope. It places an upper and a lower band at a fixed
 * percentage above and below a moving average of the price.
 *
 * ```
 * Middle = MA(closings, period)
 * Upper = Middle * (1 + percentage / 100)
 * Lower = Middle * (1 - percentage / 100)
 * ```
 *
 * Warm-up: the first `period - 1` values are NaN.
 *
 * @example
 * ```TypeScript
 * import { envelope } from 'indicatorts';
 *
 * const defaultConfig = { period: 20, percentage: 20, ma: 'sma' };
 * const { upper, middle, lower } = envelope(closings, defaultConfig);
 * ```
 * @param closings closing values.
 * @param config configuration.
 * @return envelope result.
 */
export function envelope(
  closings: number[],
  config: EnvelopeConfig = {}
): EnvelopeResult {
  const { period, percentage, ma } = { ...EnvelopeDefaultConfig, ...config };
  const middle =
    ma === 'ema'
      ? ema(closings, { period, seed: 'sma' })
      : windowedSma(closings, period);

  return {
    upper: middle.map((value) => value * (1 + percentage / 100)),
    middle,
    lower: middle.map((value) => value * (1 - percentage / 100)),
  };
}

// Export full name
export { envelope as movingAverageEnvelope };
