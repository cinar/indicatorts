// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {checkSameLength, shiftLeftBy,} from '../../helper/numArray';

/**
 * Ichimoku cloud result object.
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
 * Senkou Span A (Leading Span A) = (Tenkan-sen Line + Kijun-sen) / 2 projected 26 periods in the future
 *
 * @param tenkanSen Tenkan-sen values.
 * @param kijunSen Kijun-sen values.
 * @param medium medium period.
 */
const calculateSenkouSpanA = ({tenkanSen, kijunSen, medium}: {
    tenkanSen: number[],
    kijunSen: number[],
    medium: number
}) => {
    const ssa = new Array<number>(kijunSen.length + medium).fill(0)
    kijunSen.forEach((k, i) => {
        if (k) ssa[i + medium] = (k + tenkanSen[i]) / 2
    })
    return ssa
}

/**
 * Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2 projected 26 periods in the future
 *
 * @param highs high values.
 * @param lows low values.
 * @param long long period.
 * @param medium mediym period.
 */
const calculateSenkouSpanB = ({highs, lows, long, medium}: {
    highs: number[],
    lows: number[],
    long: number,
    medium: number
}) => new Array<number>(highs.length + medium).fill(0).reduce(averagePriceReducer({
    period: long + medium,
    highs,
    lows,
    projection: medium
}), [] as Array<number>)

/**
 * Ichimoku Cloud. Also known as Ichimoku Kinko Hyo, is a versatile indicator
 * that defines support and resistence, identifies trend direction, gauges
 * momentum, and provides trading signals.
 *
 * Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
 * Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
 * Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2 projected 26 periods in the future
 * Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2 projected 26 periods in the future
 * Chikou Span (Lagging Span) = Closing plotted 26 periods in the past.
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
        ssa: calculateSenkouSpanA({tenkanSen: tenkan, kijunSen: kijun, medium}),
        ssb: calculateSenkouSpanB({highs, lows, medium, long}),
        laggingSpan: shiftLeftBy(close, closings),
    };
}
