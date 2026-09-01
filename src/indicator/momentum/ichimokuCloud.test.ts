// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {roundDigitsAll} from '../../helper/numArray';
import {ichimokuCloud} from './ichimokuCloud';

describe('Ichimoku Cloud', () => {
    it('calculates Tenkan-sen as the middle point between high and low over the configured short period', () => {
        const highs = [2, 4]
        const lows = [1, 3]
        const closings = [1.5, 3.5]

        {
            const {tenkan} = ichimokuCloud(highs, lows, closings, {short: 1})
            deepStrictEqual(roundDigitsAll(2, tenkan), [(2 + 1) / 2, (4 + 3) / 2]);
        }
        {
            const {tenkan} = ichimokuCloud(highs, lows, closings, {short: 2})
            deepStrictEqual(roundDigitsAll(2, tenkan), [0, (4 + 1) / 2]);
        }
    })

    it('calculates Kijun-sen as the middle point between high and low over the configured medium period', () => {
        const highs = [2, 4]
        const lows = [1, 3]
        const closings = [1.5, 3.5]

        {
            const {kijun} = ichimokuCloud(highs, lows, closings, {medium: 1})
            deepStrictEqual(roundDigitsAll(2, kijun), [(2 + 1) / 2, (4 + 3) / 2]);
        }
        {
            const {kijun} = ichimokuCloud(highs, lows, closings, {medium: 2})
            deepStrictEqual(roundDigitsAll(2, kijun), [0, (4 + 1) / 2]);
        }
    })

    it('calculates SSA (Senkou-Span A) as the average between Tenkan-Sen and Kijun-Sen for that same bar', () => {
        const highs = [2, 4]
        const lows = [1, 3]
        const closings = [1.5, 3.5]

        const result = ichimokuCloud(highs, lows, closings, {short: 1, medium: 2})
        const {ssa, tenkan, kijun} = result

        // ssa[i] = (tenkan[i] + kijun[i]) / 2, same length as tenkan/kijun.
        deepStrictEqual(roundDigitsAll(2, ssa), [0.75, 3]);
        deepStrictEqual(ssa.length, tenkan.length);
        deepStrictEqual(ssa.length, kijun.length);
    })

    it('calculates SSB (Senkou-Span B) as the middle point between high and low over the configured long period ending at that bar', () => {
        const highs = [2, 4, 8, 10]
        const lows = [1, 3, 6, 3]
        const closings = [1.5, 3.5, 7.5, 3.5]

        const result = ichimokuCloud(highs, lows, closings, {medium: 2, long: 3})
        const {ssb, tenkan} = result

        deepStrictEqual(roundDigitsAll(2, ssb), [0, 0, (8 + 1) / 2, (10 + 3) / 2]);
        deepStrictEqual(ssb.length, tenkan.length);
    })

    it('ssa and ssb are the same length as tenkan/kijun/laggingSpan (regression guard for array length mismatch)', () => {
        const highs = [2, 4, 8, 10, 11, 9, 7]
        const lows = [1, 3, 6, 3, 4, 5, 2]
        const closings = [1.5, 3.5, 7.5, 3.5, 8, 6, 4]

        const {tenkan, kijun, ssa, ssb, laggingSpan} = ichimokuCloud(highs, lows, closings)

        deepStrictEqual(ssa.length, tenkan.length);
        deepStrictEqual(ssb.length, tenkan.length);
        deepStrictEqual(kijun.length, tenkan.length);
        deepStrictEqual(laggingSpan.length, tenkan.length);
        deepStrictEqual(tenkan.length, highs.length);
    })

    it('computes SSA correctly even when Kijun-sen is exactly 0 on a fully warmed-up bar (regression guard for truthiness bug)', () => {
        // With medium: 2, kijun[0] is 0 from warmup (legitimate 0-fill), but
        // kijun[1] is 0 because (max high + min low) / 2 over the window
        // happens to equal 0 -- a legitimate, fully computed value, not a
        // warmup artifact. The old `if (k) ...` truthiness check would
        // incorrectly skip writing ssa[1] in this case, leaving it stale at 0.
        const highs = [4, 6]
        const lows = [-6, -2]
        const closings = [1, 2]

        const {ssa, tenkan, kijun} = ichimokuCloud(highs, lows, closings, {short: 1, medium: 2})

        deepStrictEqual(roundDigitsAll(2, kijun), [0, 0]);
        deepStrictEqual(roundDigitsAll(2, tenkan), [-1, 2]);
        // ssa[1] must be (kijun[1] + tenkan[1]) / 2 = (0 + 2) / 2 = 1, not 0.
        deepStrictEqual(roundDigitsAll(2, ssa), [-0.5, 1]);
    })

    it('laggingSpan (Chikou-Span) is closings projected in the past by the close periods', () => {
        const highs = [2, 4, 8, 10, 11]
        const lows = [1, 3, 6, 3, 4]
        const closings = [1.5, 3.5, 7.5, 3.5, 8]

        const {laggingSpan} = ichimokuCloud(highs, lows, closings, {close: 2})

        deepStrictEqual(roundDigitsAll(2, laggingSpan), [7.5, 3.5, 8, 0, 0]);
    })
});
