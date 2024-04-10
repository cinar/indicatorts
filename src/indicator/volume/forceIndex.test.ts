// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { fi } from './forceIndex';

describe('Force Index (FI)', () => {
  const closings = [9, 11, 7, 10, 8];
  const volumes = [100, 110, 80, 120, 90];

  it('should be able to compute with a config', () => {
    const expected = [900, 220, -320, 360, -180];

    const actual = fi(closings, volumes, { period: 1 });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [900, 802.86, 642.45, 602.1, 490.37];

    const actual = fi(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
