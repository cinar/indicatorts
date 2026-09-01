// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { bop } from './balanceOfPower';

describe('Balance of Powers (BOP)', () => {
  it('should be able to compute', () => {
    const openings = [10, 20, 15, 50];
    const highs = [40, 25, 20, 60];
    const lows = [4, 10, 5, 6];
    const closings = [20, 15, 50, 55];
    const expected = [0.28, -0.33, 2.33, 0.09];

    const actual = bop(openings, highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should not propagate NaN when a bar has zero high-low range', () => {
    // Bar index 1 is a flat/halted bar where high equals low, which
    // would otherwise divide by zero.
    const openings = [10, 15];
    const highs = [20, 12];
    const lows = [5, 12];
    const closings = [15, 12];
    const expected = [0.33, 0];

    const actual = bop(openings, highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
