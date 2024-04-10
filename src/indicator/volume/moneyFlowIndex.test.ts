// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { mfi } from './moneyFlowIndex';

describe('Money Flow Index (MFI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [100, 100, 57.01, 65.85, 61.54];

    const actual = mfi(highs, lows, closings, volumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [100, 100, 70.95, 81.38, 66.46];

    const actual = mfi(highs, lows, closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
