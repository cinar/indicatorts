// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { vortex } from './vortex';

describe('Vortex Indicator', () => {
  const highs = [1404.14, 1405.95, 1405.98, 1405.87, 1410.03];
  const lows = [1396.13, 1398.8, 1395.62, 1397.32, 1400.6];
  const closings = [1402.22, 1402.8, 1405.87, 1404.11, 1403.93];

  it('should be able to compute with a config', () => {
    const expectedPlus = [1, 1.17612, 0.98002, 1.03493, 1.10276];
    const expectedMinus = [1, 0.88061, 0.9279, 0.94922, 0.8646];

    const actual = vortex(highs, lows, closings, { period: 9 });
    deepStrictEqual(roundDigitsAll(5, actual.plus), expectedPlus);
    deepStrictEqual(roundDigitsAll(5, actual.minus), expectedMinus);
  });

  it('should be able to compute without a config', () => {
    const expectedPlus = [1, 1.17612, 0.98002, 1.03493, 1.10276];
    const expectedMinus = [1, 0.88061, 0.9279, 0.94922, 0.8646];

    const actual = vortex(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(5, actual.plus), expectedPlus);
    deepStrictEqual(roundDigitsAll(5, actual.minus), expectedMinus);
  });

  it('should not propagate NaN when the true range sum is zero', () => {
    // A fully flat/halted market where every bar has zero true range,
    // so the true range sum for every window is 0.
    const flatHighs = [10, 10, 10];
    const flatLows = [10, 10, 10];
    const flatClosings = [10, 10, 10];
    const expectedPlus = [0, 0, 0];
    const expectedMinus = [0, 0, 0];

    const actual = vortex(flatHighs, flatLows, flatClosings, { period: 2 });
    deepStrictEqual(roundDigitsAll(5, actual.plus), expectedPlus);
    deepStrictEqual(roundDigitsAll(5, actual.minus), expectedMinus);
  });
});
