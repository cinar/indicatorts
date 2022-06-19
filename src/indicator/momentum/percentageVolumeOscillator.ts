// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, substract } from '../../helper/numArray';
import { ema } from '../trend/ema';

/** Default fast period value. */
const DEFAULT_FAST_PERIOD = 12;

/** Default slow period value. */
const DEFAULT_SLOW_PERIOD = 26;

/** Default signal period value. */
const DEFAULT_SIGNAL_PERIOD = 9;

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
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param signalPeriod signal period.
 * @param volumes volume values.
 * @returns oscillator result.
 */
export function percentageVolumeOscillator(
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number,
  volumes: number[]
): PercentageVolumeOscillator {
  const fastEma = ema(fastPeriod, volumes);
  const slowEma = ema(slowPeriod, volumes);

  const pvo = multiplyBy(100, divide(substract(fastEma, slowEma), slowEma));
  const signal = ema(signalPeriod, pvo);
  const histogram = substract(pvo, signal);

  return {
    pvo,
    signal,
    histogram,
  };
}

/**
 * Default Percentage Volume Oscillator calculates it with the default periods of 12, 26, 9.
 *
 * @param volumes volume values.
 * @returns oscillator result.
 */
export function defaultPercentageVolumeOscillator(
  volumes: number[]
): PercentageVolumeOscillator {
  return percentageVolumeOscillator(
    DEFAULT_FAST_PERIOD,
    DEFAULT_SLOW_PERIOD,
    DEFAULT_SIGNAL_PERIOD,
    volumes
  );
}
