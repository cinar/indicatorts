// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';
import { ema } from './exponentialMovingAverage';
import { msum } from './movingSum';

/**
 * Optional configuration of MI parameters.
 */
export interface MIConfig {
  emaPeriod?: number;
  miPeriod?: number;
}

/**
 * The default configuration of MI.
 */
export const MIDefaultConfig: Required<MIConfig> = {
  emaPeriod: 9,
  miPeriod: 25,
};

/**
 * The Mass Index (MI) uses the high-low range to identify trend reversals
 * based on range expansions.
 *
 * Singe EMA = EMA(9, Highs - Lows)
 * Double EMA = EMA(9, Single EMA)
 * Ratio = Single EMA / Double EMA
 * MI = Sum(25, Ratio)
 *
 * @param highs high values.
 * @param lows low values.
 * @param config configuration.
 * @returns mi values.
 */
export function mi(
  highs: number[],
  lows: number[],
  config: MIConfig = {}
): number[] {
  const { emaPeriod, miPeriod } = { ...MIDefaultConfig, ...config };
  const ema1 = ema(subtract(highs, lows), { period: emaPeriod });
  const ema2 = ema(ema1, { period: emaPeriod });
  const ratio = divide(ema1, ema2);
  const result = msum(ratio, { period: miPeriod });

  return result;
}

// Export full name
export { mi as massIndex };
