// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {roundDigitsAll} from '../../helper/numArray';
import {ichimokuCloud} from './ichimokuCloud';

describe('Ichimoku Cloud', () => {
    it('calculates conversion (tenkan-sen) as the middle point between high and low over the configured short period', () => {
        const highs = [2, 4]
        const lows = [1, 3]
        const closings = [1.5, 3.5]

        {
            const {conversion} = ichimokuCloud(highs, lows, closings, {short: 1})
            deepStrictEqual(roundDigitsAll(2, conversion), [(2 + 1) / 2, (4 + 3) / 2]);
        }
        {
            const {conversion} = ichimokuCloud(highs, lows, closings, {short: 2})
            deepStrictEqual(roundDigitsAll(2, conversion), [0, (4 + 1) / 2]);
        }
    })

    it('calculates base (kijun-sen) as the middle point between high and low over the configured medium period', () => {
        const highs = [2, 4]
        const lows = [1, 3]
        const closings = [1.5, 3.5]

        {
            const {base} = ichimokuCloud(highs, lows, closings, {medium: 1})
            deepStrictEqual(roundDigitsAll(2, base), [(2 + 1) / 2, (4 + 3) / 2]);
        }
        {
            const {base} = ichimokuCloud(highs, lows, closings, {medium: 2})
            deepStrictEqual(roundDigitsAll(2, base), [0, (4 + 1) / 2]);
        }
    })

    it('calculates leadingSpanA (Senkou-Span A) as the average between Tenkan-Sen and Kijun-Sen projected in the future by the medium period', () => {
        const highs = [2, 4]
        const lows = [1, 3]
        const closings = [1.5, 3.5]

        const {leadingSpanA} = ichimokuCloud(highs, lows, closings, {short: 1, medium: 2})

        const tenkan = (4 + 3) / 2
        const kijun = (4 + 1) / 2
        deepStrictEqual(roundDigitsAll(2, leadingSpanA), [0, 0, 0, (tenkan + kijun) / 2]);
    })

    it('calculates leadingSpanB (Senkou-Span B) as the middle point between high and low over the configured long period projected in the future by the medium period', () => {
        const highs = [2, 4, 8, 10]
        const lows = [1, 3, 6, 3]
        const closings = [1.5, 3.5, 7.5, 3.5]

        const {leadingSpanB} = ichimokuCloud(highs, lows, closings, {medium: 2, long: 3})

        deepStrictEqual(roundDigitsAll(2, leadingSpanB), [0, 0, 0, 0, (8 + 1) / 2, (10 + 3) / 2]);
    })

    it('laggingSpan (Chikou-Span) is closings projected in the past by the close periods', () => {
        const highs = [2, 4, 8, 10]
        const lows = [1, 3, 6, 3]
        const closings = [1.5, 3.5, 7.5, 3.5]

        const {laggingSpan} = ichimokuCloud(highs, lows, closings, {close: 2})

        deepStrictEqual(roundDigitsAll(2, laggingSpan), [7.5, 3.5, 0, 0]);
    })
});
