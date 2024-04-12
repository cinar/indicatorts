// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { cmf } from './chaikinMoneyFlow';

describe('Chaikin Money Flow (CMF)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const volumes = [100, 110, 80, 120, 90];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expected = [0.5, 1.81, 0.67, -0.41, -0.87];

    const actual = cmf(highs, lows, closings, volumes, { period: 14 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0.5, 1.81, 0.67, -0.41, -0.87];

    const actual = cmf(highs, lows, closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
