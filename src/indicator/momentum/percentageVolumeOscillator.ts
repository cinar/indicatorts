// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, multiplyBy, subtract } from '../../helper/numArray';
import { ema } from '../trend/exponentialMovingAverage';

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
}

/**
 * The default configuration of PVO.
 */
export const PVODefaultConfig: Required<PVOConfig> = {
  fast: 12,
  slow: 26,
  signal: 9,
};

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
export function pvo(volumes: number[], config: PVOConfig = {}): PVOResult {
  const {
    fast: fastPeriod,
    slow: slowPeriod,
    signal: signalPeriod,
  } = { ...PVODefaultConfig, ...config };
  const fastEma = ema(volumes, { period: fastPeriod });
  const slowEma = ema(volumes, { period: slowPeriod });

  const pvoResult = multiplyBy(
    100,
    divide(subtract(fastEma, slowEma), slowEma)
  );
  const signal = ema(pvoResult, { period: signalPeriod });
  const histogram = subtract(pvoResult, signal);

  return {
    pvoResult,
    signal,
    histogram,
  };
}

// Export full name
export { pvo as percentageVolumeOscillator };
