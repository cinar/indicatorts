// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { obv } from './onBalanceVolume';

describe('On Balance Volume (OBV)', () => {
  it('should be able to compute without a config', () => {
    const closings = [9, 11, 7, 10, 8];
    const volumes = [100, 110, 80, 120, 90];
    const expected = [0, 110, 30, 150, 60];

    const actual = obv(closings, volumes);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
