// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { cci } from './communityChannelIndex';

describe('Community Channel Index (CMI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    // Index 0 has a zero mean deviation, since there is only a single
    // sample in the moving average window at that point, so it is
    // guarded to 0 instead of NaN (0 / 0).
    const expected = [0, 133.33, 114.29, 200, 26.32];

    const actual = cci(highs, lows, closings, { period: 50 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 133.33, 114.29, 200, 26.32];

    const actual = cci(highs, lows, closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should not propagate NaN when the mean deviation is zero', () => {
    // A fully flat market where the typical price never deviates from
    // its own moving average, so the mean deviation is 0 for every bar.
    const flatHighs = [10, 10, 10];
    const flatLows = [10, 10, 10];
    const flatClosings = [10, 10, 10];
    const expected = [0, 0, 0];

    const actual = cci(flatHighs, flatLows, flatClosings, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
