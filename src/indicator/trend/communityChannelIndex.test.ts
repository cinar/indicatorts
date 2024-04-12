// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { cci } from './communityChannelIndex';

describe('Community Channel Index (CMI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expected = [NaN, 133.33, 114.29, 200, 26.32];

    const actual = cci(highs, lows, closings, { period: 50 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [NaN, 133.33, 114.29, 200, 26.32];

    const actual = cci(highs, lows, closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
