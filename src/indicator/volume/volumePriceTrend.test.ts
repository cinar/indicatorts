// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { vpt } from './volumePriceTrend';

describe('Volume Price Trend (VPT)', () => {
  it('should be able to compute', () => {
    const closings = [9, 11, 7, 10, 8];
    const volumes = [100, 110, 80, 120, 90];
    const expected = [0, 24.44, -4.65, 46.78, 28.78];

    const actual = vpt(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
