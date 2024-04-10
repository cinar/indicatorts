// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { add, divideBy, subtract } from '../../helper/numArray';
import { sma } from '../trend/sma';

/**
 * Optional configuration of parameters
 */
export interface AwesomeOscillatorConfig {
  fast?: number;
  slow?: number;
}

/**
 * The default configuration.
 */
export const AwesomeOscillatorDefaultConfig: Required<AwesomeOscillatorConfig> =
  {
    fast: 5,
    slow: 34,
  };

/**
 * Awesome Oscillator.
 *
 * Median Price = ((Low + High) / 2).
 * AO = 5-Period SMA - 34-Period SMA.
 *
 * @param highs high values.
 * @param lows low values.
 * @param config configuration.
 * @return awesome oscillator.
 */
export function awesomeOscillator(
  highs: number[],
  lows: number[],
  config: AwesomeOscillatorConfig = {}
): number[] {
  const { fast, slow } = { ...AwesomeOscillatorDefaultConfig, ...config };
  const medianPrice = divideBy(2, add(lows, highs));
  const smaFast = sma(medianPrice, { period: fast });
  const smaSlow = sma(medianPrice, { period: slow });
  const ao = subtract(smaFast, smaSlow);
  return ao;
}
