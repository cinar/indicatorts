// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {add, checkSameLength, divideBy, shiftRightBy} from '../../helper/numArray';
import {mmax} from '../trend/mmax';
import {mmin} from '../trend/mmin';

/**
 * Ichimoku cloud result object.
 */
export interface IchimokuCloudResult {
  conversionLine: number[];
  baseLine: number[];
  leadingSpanA: number[];
  leadingSpanB: number[];
  laggingSpan: number[];
}

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
 * @param {number[]} highs high values.
 * @param {number[]} lows low values.
 * @param {number[]} closings closing values.
 * @return {IchimokuCloudResult} ichimoku cloud result object.
 */
export function ichimokuCloud(
    highs: number[],
    lows: number[],
    closings: number[],
): IchimokuCloudResult {
  checkSameLength(highs, lows, closings);

  const conversionLine = divideBy(2, add(mmax(9, highs), mmin(9, lows)));
  const baseLine = divideBy(2, add(mmax(26, highs), mmin(26, lows)));
  const leadingSpanA = divideBy(2, add(conversionLine, baseLine));
  const leadingSpanB = divideBy(2, add(mmax(52, highs), mmin(52, lows)));
  const laggingSpan = shiftRightBy(26, closings);

  return {
    conversionLine,
    baseLine,
    leadingSpanA,
    leadingSpanB,
    laggingSpan,
  };
}
