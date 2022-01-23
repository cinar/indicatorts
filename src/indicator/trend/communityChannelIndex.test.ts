// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { defaultCommunityChannelIndex } from './communityChannelIndex';

describe('Community Channel Index (CMI)', () => {
  it('should be able to compute CMI', () => {
    const highs = [10, 9, 12, 14, 12];
    const lows = [6, 7, 9, 12, 10];
    const closings = [9, 11, 7, 10, 8];
    const expected = [NaN, 133.33, 114.29, 200, 26.32];

    const actual = defaultCommunityChannelIndex(highs, lows, closings);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
