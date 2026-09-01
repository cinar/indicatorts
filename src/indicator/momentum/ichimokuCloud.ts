// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {checkSameLength, shiftLeftBy,} from '../../helper/numArray';

/**
 * Ichimoku cloud result object.
 *
 * All five arrays are the same length as the input `highs`/`lows`/`closings`.
 * Each array represents that indicator's value as of that bar; Senkou Span A
 * (`ssa`) and Senkou Span B (`ssb`) are conventionally *plotted* `medium`
 * periods ahead on a chart, but that projection is left to the caller/renderer
 * and is not reflected in the array shape/indexing itself.
 */
export interface IchimokuCloudResult {
    tenkan: number[];
    kijun: number[];
    ssa: number[];
    ssb: number[];
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
 * Returns a function calculating average price (max - min) / 2 based on period and projection
 *
 * @param period
 * @param highs
 * @param lows
 * @param projection
 */
const averagePriceReducer = ({period, highs, lows, projection = 0}: {
    period: number,
    highs: number[],
    lows: number[],
    projection?: number
}) => (acc: number[], _: number, i: number) => {
    if (i < period - 1) return [...acc, 0]
    const from = i + 1 - period
    const to = i - projection + 1
    const max = Math.max(...highs.slice(from, to))
    const min = Math.min(...lows.slice(from, to))
    return [...acc, (max + min) / 2]
}

/**
 * Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
 *
 * @param highs high values.
 * @param lows low values.
 * @param short short period.
 */
const calculateTenkanSen = ({highs, lows, short}: {
    highs: number[],
    lows: number[],
    short: number
}) => highs.reduce(averagePriceReducer({period: short, highs, lows}), [] as Array<number>)


/**
 * Kijun-sen (Conversion Line) = (26-Period High + 26-Period Low) / 2
 *
 * @param highs high values.
 * @param lows low values.
 * @param medium mediym period.
 */
const calculateKijunSen = ({highs, lows, medium}: {
    highs: number[],
    lows: number[],
    medium: number
}) => highs.reduce(averagePriceReducer({period: medium, highs, lows}), [] as Array<number>)

/**
 * Senkou Span A (Leading Span A) = (Tenkan-sen Line + Kijun-sen) / 2
 *
 * Note: conventionally this is *plotted* 26 periods ahead on a chart, but
 * the returned array itself stays the same length as the other indicator
 * arrays and represents each bar's value as of that bar. Projecting it
 * forward for display is the caller's/renderer's responsibility.
 *
 * @param tenkanSen Tenkan-sen values.
 * @param kijunSen Kijun-sen values.
 */
const calculateSenkouSpanA = ({tenkanSen, kijunSen}: {
    tenkanSen: number[],
    kijunSen: number[],
}) => kijunSen.map((k, i) => (k + tenkanSen[i]) / 2)

/**
 * Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2
 *
 * Note: conventionally this is *plotted* 26 periods ahead on a chart, but
 * the returned array itself stays the same length as the other indicator
 * arrays and represents each bar's value as of that bar. Projecting it
 * forward for display is the caller's/renderer's responsibility.
 *
 * @param highs high values.
 * @param lows low values.
 * @param long long period.
 */
const calculateSenkouSpanB = ({highs, lows, long}: {
    highs: number[],
    lows: number[],
    long: number,
}) => highs.reduce(averagePriceReducer({period: long, highs, lows}), [] as Array<number>)

/**
 * Ichimoku Cloud. Also known as Ichimoku Kinko Hyo, is a versatile indicator
 * that defines support and resistence, identifies trend direction, gauges
 * momentum, and provides trading signals.
 *
 * Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
 * Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
 * Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2, conventionally plotted 26 periods in the future
 * Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2, conventionally plotted 26 periods in the future
 * Chikou Span (Lagging Span) = Closing plotted 26 periods in the past.
 *
 * All five arrays returned (`tenkan`, `kijun`, `ssa`, `ssb`, `laggingSpan`) are
 * the same length as the input (`highs`/`lows`/`closings`), each representing
 * that indicator's value as of that bar. Senkou Span A/B are conventionally
 * *plotted* `medium` periods ahead of their bar on a chart, but that forward
 * projection is a display/rendering concern left to the caller -- it is not
 * baked into the shape of the returned `ssa`/`ssb` arrays.
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

    const {short, medium, long, close} = {
        ...IchimokuCloudDefaultConfig,
        ...config,
    };

    const tenkan = calculateTenkanSen({highs, lows, short})
    const kijun = calculateKijunSen({highs, lows, medium})

    return {
        tenkan,
        kijun,
        ssa: calculateSenkouSpanA({tenkanSen: tenkan, kijunSen: kijun}),
        ssb: calculateSenkouSpanB({highs, lows, long}),
        laggingSpan: shiftLeftBy(close, closings),
    };
}
