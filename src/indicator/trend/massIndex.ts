// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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
  const ratioRaw = divide(ema1, ema2);

  // When a run of flat/halted bars (high === low) drives the range's EMA
  // to zero, ema2 is also 0, so the ratio is treated as 0 instead of NaN
  // (0 / 0). Without this guard, a single such stretch would introduce a
  // NaN that corrupts every subsequent rolling sum, since ratio feeds
  // into msum.
  const ratio = ratioRaw.map((value, i) => (ema2[i] === 0 ? 0 : value));

  const result = msum(ratio, { period: miPeriod });

  return result;
}

// Export full name
export { mi as massIndex };
