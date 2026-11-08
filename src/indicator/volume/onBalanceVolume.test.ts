// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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

  it('should return an empty array for empty input', () => {
    const actual = obv([], []);
    expect(actual).toStrictEqual([]);
  });

  it('should leave the value unchanged when the closing is unchanged', () => {
    expect(obv([10, 11, 11, 10], [100, 200, 300, 400])).toStrictEqual([
      0, 200, 200, -200,
    ]);
  });
});
