// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { vwap } from './volumeWeightedAveragePrice';

describe('Volume Weighted Average Price (VWAP)', () => {
  const closings = [9, 11, 7, 10, 8];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [9, 10.05, 9.32, 8.8, 9.14];

    const actual = vwap(closings, volumes, { period: 2 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [9, 10.05, 9.21, 9.44, 9.18];

    const actual = vwap(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
