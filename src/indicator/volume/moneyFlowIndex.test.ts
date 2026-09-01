// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { mfi } from './moneyFlowIndex';

describe('Money Flow Index (MFI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [100, 100, 100, 100, 61.54];

    const actual = mfi(highs, lows, closings, volumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [100, 100, 100, 100, 81.67];

    const actual = mfi(highs, lows, closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should classify money flow sign by typical price change, not raw money flow change', () => {
    // Typical price and raw money flow (typical price * volume) move in
    // opposite directions on day 2: typical price falls from 100 to 80
    // (a down day) while volume spikes from 1000 to 100000, so raw money
    // flow rises from 100000 to 8000000 (an increase). The sign must be
    // derived from the typical price change (down), not the raw money
    // flow change (up), otherwise this severe down day would be
    // misclassified as positive/bullish money flow.
    const rHighs = [90, 100, 80, 90, 95];
    const rLows = [90, 100, 80, 90, 95];
    const rClosings = [90, 100, 80, 90, 95];
    const rVolumes = [1000, 1000, 100000, 1000, 1000];

    const expectedWithConfig = [100, 100, 1.23, 1.11, 100];
    const actualWithConfig = mfi(rHighs, rLows, rClosings, rVolumes, {
      period: 2,
    });
    expect(roundDigitsAll(2, actualWithConfig)).toStrictEqual(
      expectedWithConfig
    );

    const expectedDefault = [100, 100, 2.32, 3.38, 4.48];
    const actualDefault = mfi(rHighs, rLows, rClosings, rVolumes);
    expect(roundDigitsAll(2, actualDefault)).toStrictEqual(expectedDefault);
  });
});
