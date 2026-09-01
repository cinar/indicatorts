// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { ad } from './accumulationDistribution';

describe('Accumulation/Distribution (A/D)', () => {
  it('should be able to compute', () => {
    const highs = [10, 9, 12, 14, 12];
    const lows = [6, 7, 9, 12, 10];
    const closings = [9, 11, 7, 10, 8];
    const volumes = [100, 200, 300, 400, 500];

    const expected = [50, 650, -50, -1250, -2750];

    const actual = ad(highs, lows, closings, volumes);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should not propagate NaN when a bar has zero high-low range', () => {
    // Bar index 2 is a flat/halted bar where high equals low, which
    // would otherwise divide by zero when computing the money flow
    // multiplier for that bar.
    const highs = [10, 12, 8, 14, 15];
    const lows = [5, 7, 8, 9, 10];
    const closings = [8, 10, 8, 12, 13];
    const volumes = [100, 200, 300, 400, 500];

    const expected = [20, 60, 60, 140, 240];

    const actual = ad(highs, lows, closings, volumes);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
