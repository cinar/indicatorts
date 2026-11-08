// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';
import { roundDigitsAll } from '../../helper/numArray';
import { cci } from './commodityChannelIndex';

describe('Commodity Channel Index (CCI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    // Index 0 has a zero mean deviation, since there is only a single
    // sample in the moving average window at that point, so it is
    // guarded to 0 instead of NaN (0 / 0).
    const expected = [0, 66.67, 80, 133.33, 17.54];

    const actual = cci(highs, lows, closings, { period: 50 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 66.67, 80, 133.33, 17.54];

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

  it('should compute the mean deviation around the current window average (#586)', () => {
    // high = low = close, so typical price = prices. For the last window
    // [12, 13, 20], the average is 15 and the mean deviation around it is
    // 10 / 3, giving CCI = (20 - 15) / (0.015 * 10 / 3) = 100. Values from
    // index 2 onward match TA-Lib CCI(period=3).
    const prices = [10, 11, 12, 13, 20];
    const expected = [0, 66.67, 100, 100, 100];

    const actual = cci(prices, prices, prices, { period: 3 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should match the reference data', () => {
    const data = readCsv(join(__dirname, 'testdata/commodityChannelIndex.csv'));
    assertColumn(cci(data.high, data.low, data.close), data.cci);
  });
});
