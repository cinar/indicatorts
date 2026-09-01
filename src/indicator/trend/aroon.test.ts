// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { aroon } from './aroon';

describe('Aroon', () => {
  const highs = [40, 25, 20, 60];
  const lows = [4, 10, 5, 6];

  it('should be able to compute with a config', () => {
    const expectedUp = [100, 92.86, 85.71, 100];
    const expectedDown = [100, 92.86, 85.71, 78.57];

    const actual = aroon(highs, lows, { period: 14 });
    deepStrictEqual(roundDigitsAll(2, actual.up), expectedUp);
    deepStrictEqual(roundDigitsAll(2, actual.down), expectedDown);
  });

  it('should be able to compute without a config', () => {
    const expectedUp = [100, 96, 92, 100];
    const expectedDown = [100, 96, 92, 88];

    const actual = aroon(highs, lows);
    deepStrictEqual(roundDigitsAll(2, actual.up), expectedUp);
    deepStrictEqual(roundDigitsAll(2, actual.down), expectedDown);
  });

  it('should measure periods since the actual window high/low when the window slides', () => {
    // period is smaller than the number of bars, so the trailing window
    // actually slides, and highs contains a tie (index 1 and 2 both 20)
    // to exercise the "most recent occurrence wins" tie-break rule.
    const slidingHighs = [10, 20, 20, 15];
    const slidingLows = [20, 25, 10, 30];

    // Highs: window [i-1, i] once i >= 1.
    //  i=0: window=[10]           -> high=10 at 0 -> since=0
    //  i=1: window=[10,20]        -> high=20 at 1 -> since=0
    //  i=2: window=[20,20]        -> high=20 at 2 (tie, latest wins) -> since=0
    //  i=3: window=[20,15]        -> high=20 at 2 -> since=1
    // Aroon Up = ((2 - since) / 2) * 100
    const expectedUp = [100, 100, 100, 50];

    // Lows: window [i-1, i] once i >= 1.
    //  i=0: window=[20]           -> low=20 at 0 -> since=0
    //  i=1: window=[20,25]        -> low=20 at 0 -> since=1
    //  i=2: window=[25,10]        -> low=10 at 2 -> since=0
    //  i=3: window=[10,30]        -> low=10 at 2 -> since=1
    // Aroon Down = ((2 - since) / 2) * 100
    const expectedDown = [100, 50, 100, 50];

    const actual = aroon(slidingHighs, slidingLows, { period: 2 });
    deepStrictEqual(roundDigitsAll(2, actual.up), expectedUp);
    deepStrictEqual(roundDigitsAll(2, actual.down), expectedDown);
  });
});
