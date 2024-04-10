// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { divide, subtract } from '../../helper/numArray';
import { ema } from './ema';
import { msum } from './msum';

/**
 * Optional configuration of MassIndex parameters.
 */
export interface MassIndexConfig {
  emaPeriod?: number;
  miPeriod?: number;
}

/**
 * The default configuration of MassIndex.
 */
export const MassIndexDefaultConfig: Required<MassIndexConfig> = {
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
export function massIndex(
  highs: number[],
  lows: number[],
  config: MassIndexConfig = {}
): number[] {
  const { emaPeriod, miPeriod } = { ...MassIndexDefaultConfig, ...config };
  const ema1 = ema(subtract(highs, lows), { period: emaPeriod });
  const ema2 = ema(ema1, { period: emaPeriod });
  const ratio = divide(ema1, ema2);
  const mi = msum(ratio, { period: miPeriod });

  return mi;
}
