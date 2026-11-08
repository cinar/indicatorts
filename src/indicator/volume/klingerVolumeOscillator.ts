// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { checkSameLength } from '../../helper/numArray';
import { maskNaN } from '../../helper/window';
import { ema } from '../trend/exponentialMovingAverage';

/**
 * KVO result object.
 */
export interface KVOResult {
  kvo: number[];
  signal: number[];
}

/**
 * Optional configuration of KVO parameters.
 */
export interface KVOConfig {
  shortPeriod?: number;
  longPeriod?: number;
  signalPeriod?: number;
}

/**
 * The default configuration of KVO.
 */
export const KVODefaultConfig: Required<KVOConfig> = {
  shortPeriod: 34,
  longPeriod: 55,
  signalPeriod: 13,
};

/**
 * Klinger Volume Oscillator (KVO). It signs the volume by the direction of
 * the bar's high and low compared with the previous bar, and takes the
 * difference of a short and a long exponential moving average of it, with
 * an exponential moving average of the difference as the signal line.
 *
 * ```
 * Trend = +1 if High > Previous High and Low >= Previous Low
 *         -1 if High <= Previous High and Low < Previous Low
 *          0 otherwise
 * VF = Volume * Trend
 * KVO = EMA(VF, shortPeriod) - EMA(VF, longPeriod)
 * Signal = EMA(KVO, signalPeriod)
 * ```
 *
 * The volume force starts at the second bar, and each EMA starts from the
 * simple moving average of its first values.
 *
 * Warm-up: both outputs are NaN for the first
 * `longPeriod + signalPeriod - 1` bars.
 *
 * @example
 * ```TypeScript
 * import { kvo } from 'indicatorts';
 *
 * const defaultConfig = { shortPeriod: 34, longPeriod: 55, signalPeriod: 13 };
 * const { kvo: kvoLine, signal } = kvo(highs, lows, volumes, defaultConfig);
 *
 * // Alternatively:
 * // const { kvo: kvoLine, signal } = klingerVolumeOscillator(highs, lows, volumes, defaultConfig);
 * ```
 * @param highs high values.
 * @param lows low values.
 * @param volumes volume values.
 * @param config configuration.
 * @return kvo result.
 */
export function kvo(
  highs: number[],
  lows: number[],
  volumes: number[],
  config: KVOConfig = {}
): KVOResult {
  checkSameLength(highs, lows, volumes);

  const { shortPeriod, longPeriod, signalPeriod } = {
    ...KVODefaultConfig,
    ...config,
  };

  const forces = volumes.map((volume, i) => {
    if (i === 0) {
      return NaN;
    }

    if (highs[i] > highs[i - 1] && lows[i] >= lows[i - 1]) {
      return volume;
    }

    if (highs[i] <= highs[i - 1] && lows[i] < lows[i - 1]) {
      return -volume;
    }

    return 0;
  });

  const short = ema(forces, { period: shortPeriod, seed: 'sma' });
  const long = ema(forces, { period: longPeriod, seed: 'sma' });
  const line = short.map((value, i) => value - long[i]);
  const signal = ema(line, { period: signalPeriod, seed: 'sma' });

  return {
    kvo: maskNaN(line, signal),
    signal,
  };
}

// Export full name
export { kvo as klingerVolumeOscillator };
