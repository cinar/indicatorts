// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, divideBy, subtract } from '../../helper/numArray';
import { sma } from '../trend/simpleMovingAverage';

/**
 * Optional configuration of AO parameters.
 */
export interface AOConfig {
  fast?: number;
  slow?: number;
}

/**
 * The default configuration of AO.
 */
export const AODefaultConfig: Required<AOConfig> = {
  fast: 5,
  slow: 34,
};

/**
 * Awesome Oscillator (AO).
 *
 * Median Price = ((Low + High) / 2).
 * AO = 5-Period SMA - 34-Period SMA.
 *
 * @param highs high values.
 * @param lows low values.
 * @param config configuration.
 * @return awesome oscillator.
 */
export function ao(
  highs: number[],
  lows: number[],
  config: AOConfig = {}
): number[] {
  const { fast, slow } = { ...AODefaultConfig, ...config };
  const medianPrice = divideBy(2, add(lows, highs));
  const smaFast = sma(medianPrice, { period: fast });
  const smaSlow = sma(medianPrice, { period: slow });
  const result = subtract(smaFast, smaSlow);
  return result;
}

// Export full name
export { ao as awesomeOscillator };
