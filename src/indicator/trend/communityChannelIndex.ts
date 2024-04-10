// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { abs, divide, multiplyBy, subtract } from '../../helper/numArray';
import { sma } from './sma';
import { typicalPrice } from './typicalPrice';

/**
 * Optional configuration of CommunityChannelIndex parameters.
 */
export interface CommunityChannelIndexConfig {
  period?: number;
}

/**
 * The default configuration of CommunityChannelIndex.
 */
export const CommunityChannelIndexDefaultConfig: Required<CommunityChannelIndexConfig> =
  {
    period: 20,
  };

/**
 * The Community Channel Index (CMI) is a momentum-based oscillator
 * used to help determine when an investment vehicle is reaching a
 * condition of being overbought or oversold.
 *
 * Moving Average = Sma(Period, Typical Price)
 * Mean Deviation = Sma(Period, Abs(Typical Price - Moving Average))
 * CMI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @returns cmi values.
 */
export function communityChannelIndex(
  highs: number[],
  lows: number[],
  closings: number[],
  config: CommunityChannelIndexConfig = {}
): number[] {
  const { period } = { ...CommunityChannelIndexDefaultConfig, ...config };
  const tp = typicalPrice(highs, lows, closings);
  const ma = sma(period, tp);
  const md = sma(period, abs(subtract(tp, ma)));
  const cci = divide(subtract(tp, ma), multiplyBy(0.015, md));
  return cci;
}
