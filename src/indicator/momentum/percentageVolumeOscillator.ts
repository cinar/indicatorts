// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/ema';

/**
 * Optional configuration of PercentageVolumeOscillator parameters.
 */
export interface PercentageVolumeOscillatorConfig {
  fast?: number;
  slow?: number;
  signal?: number;
}

/**
 * The default configuration of PercentageVolumeOscillator.
 */
export const PercentageVolumeOscillatorDefaultConfig: Required<PercentageVolumeOscillatorConfig> =
  {
    fast: 12,
    slow: 26,
    signal: 9,
  };

/**
 * Percentage volume oscillator result.
 */
export interface PercentageVolumeOscillator {
  pvo: number[];
  signal: number[];
  histogram: number[];
}

/**
 * Percentage Volume Oscillator (PVO). It is a momentum oscillator for the volume.
 * It is used to indicate the ups and downs based on the volume. A breakout is
 * confirmed when PVO is positive.
 *
 * PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 *
 * @param volumes volume values.
 * @param config configuration.
 * @returns oscillator result.
 */
export function percentageVolumeOscillator(
  volumes: number[],
  config: PercentageVolumeOscillatorConfig = {}
): PercentageVolumeOscillator {
  const {
    fast: fastPeriod,
    slow: slowPeriod,
    signal: signalPeriod,
  } = { ...PercentageVolumeOscillatorDefaultConfig, ...config };
  const fastEma = ema(volumes, { period: fastPeriod });
  const slowEma = ema(volumes, { period: slowPeriod });

  const pvo = multiplyBy(100, divide(subtract(fastEma, slowEma), slowEma));
  const signal = ema(pvo, { period: signalPeriod });
  const histogram = subtract(pvo, signal);

  return {
    pvo,
    signal,
    histogram,
  };
}
