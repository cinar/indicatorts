// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {
  add,
  checkSameLength,
  divideBy,
  shiftRightBy,
} from '../../helper/numArray';
import { mmax } from '../trend/mmax';
import { mmin } from '../trend/mmin';

/**
 * Ichimoku cloud result object.
 */
export interface IchimokuCloudResult {
  conversion: number[];
  base: number[];
  leadingSpanA: number[];
  leadingSpanB: number[];
  laggingSpan: number[];
}

/**
 * Optional configuration of Ichimoku cloud parameters.
 */
export interface IchimokuCloudConfig {
  short?: number;
  medium?: number;
  long?: number;
  close?: number;
}

/**
 * The default configuration of Ichimoku cloud.
 */
export const IchimokuCloudDefaultConfig: Required<IchimokuCloudConfig> = {
  short: 9,
  medium: 26,
  long: 52,
  close: 26,
};

/**
 * Ichimoku Cloud. Also known as Ichimoku Kinko Hyo, is a versatile indicator
 * that defines support and resistence, identifies trend direction, gauges
 * momentum, and provides trading signals.
 *
 * Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
 * Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
 * Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2
 * Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2
 * Chikou Span (Lagging Span) = Closing plotted 26 days in the past.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param config configuration.
 * @return ichimoku cloud result object.
 */
export function ichimokuCloud(
  highs: number[],
  lows: number[],
  closings: number[],
  config: IchimokuCloudConfig = {}
): IchimokuCloudResult {
  checkSameLength(highs, lows, closings);

  const { short, medium, long, close } = {
    ...IchimokuCloudDefaultConfig,
    ...config,
  };
  const conversion = divideBy(
    2,
    add(mmax(highs, { period: short }), mmin(lows, { period: short }))
  );
  const base = divideBy(
    2,
    add(mmax(highs, { period: medium }), mmin(lows, { period: medium }))
  );
  const leadingSpanA = divideBy(2, add(conversion, base));
  const leadingSpanB = divideBy(
    2,
    add(mmax(highs, { period: long }), mmin(lows, { period: long }))
  );
  const laggingSpan = shiftRightBy(close, closings);

  return {
    conversion,
    base,
    leadingSpanA,
    leadingSpanB,
    laggingSpan,
  };
}
