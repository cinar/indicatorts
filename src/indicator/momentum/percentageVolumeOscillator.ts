// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';
import { Seed } from '../types';

/**
 * Percentage volume oscillator result.
 */
export interface PVOResult {
  pvoResult: number[];
  signal: number[];
  histogram: number[];
}

/**
 * Optional configuration of PVO parameters.
 */
export interface PVOConfig {
  fast?: number;
  slow?: number;
  signal?: number;
  /**
   * How the averages start: `'first'` (default) starts from the first value,
   * `'sma'` starts from a simple moving average, as TA-Lib does.
   */
  seed?: Seed;
}

/**
 * The default configuration of PVO.
 */
export const PVODefaultConfig: Required<PVOConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
  seed: 'first',
};

/**
 * Percentage Volume Oscillator (PVO). It is a momentum oscillator for the volume.
 * It is used to indicate the ups and downs based on the volume. A breakout is
 * confirmed when PVO is positive.
 *
 * ```
 * PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 * ```
 *
 * Warm-up: built on the exponential moving average, which starts from the
 * first value rather than from a simple moving average, so the early values
 * can differ from other libraries such as TA-Lib. Set `seed: 'sma'` to start
 * the way TA-Lib does. See [Warm-up and seeding](https://github.com/cinar/indicatorts#warm-up-and-seeding).
 *
 * @example
 * ```TypeScript
 * import { pvo } from 'indicatorts';
 *
 * const defaultConfig = { fast: 12, slow: 26, signal: 9 };
 * const { pvoResult, signal, histogram } = pvo(volumes, defaultConfig);
 *
 * // Alternatively:
 * // const { pvoResult, signal, histogram } = percentageVolumeOscillator(volumes, defaultConfig);
 * ```
 * @param volumes volume values.
 * @param config configuration.
 * @returns oscillator result.
 */
export function pvo(volumes: number[], config: PVOConfig = {}): PVOResult {
  const {
    fast: fastPeriod,
    slow: slowPeriod,
    signal: signalPeriod,
    seed,
  } = { ...PVODefaultConfig, ...config };
  const fastEma = ema(volumes, { period: fastPeriod, seed });
  const slowEma = ema(volumes, { period: slowPeriod, seed });

  const pvoResult = multiplyBy(
    100,
    divide(subtract(fastEma, slowEma), slowEma)
  );
  const signal = ema(pvoResult, { period: signalPeriod, seed });
  const histogram = subtract(pvoResult, signal);

  return {
    pvoResult,
    signal,
    histogram,
  };
}

// Export full name
export { pvo as percentageVolumeOscillator };
