// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { abs, divide, multiplyBy, substract } from '../../helper/numArray';
import { sma } from './sma';
import { typicalPrice } from './typicalPrice';

/**
 * Default period of CMI.
 */
export const CMI_PERIOD = 20;

/**
 * The Community Channel Index (CMI) is a momentum-based oscillator
 * used to help determine when an investment vehicle is reaching a
 * condition of being overbought or oversold.
 *
 * Moving Average = Sma(Period, Typical Price)
 * Mean Deviation = Sma(Period, Abs(Typical Price - Moving Average))
 * CMI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @returns cmi values.
 */
export function communityChannelIndex(
  period: number,
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  const tp = typicalPrice(highs, lows, closings);
  const ma = sma(period, tp);
  const md = sma(period, abs(substract(tp, ma)));
  const cci = divide(substract(tp, ma), multiplyBy(0.015, md));
  return cci;
}

/**
 * The default community channel index with the period of 20.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @returns cmi values.
 */
export function defaultCommunityChannelIndex(
  highs: number[],
  lows: number[],
  closings: number[]
): number[] {
  return communityChannelIndex(CMI_PERIOD, highs, lows, closings);
}
