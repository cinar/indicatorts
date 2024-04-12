// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { mi } from './massIndex';

describe('Mass Index (MI)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];

  it('should be able to compute with a config', () => {
    const expected = [1, 1.88, 2.78, 3.62, 4.45];

    const actual = mi(highs, lows, {
      emaPeriod: 5,
      miPeriod: 17,
    });
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 1.92, 2.83, 3.69, 4.52];

    const actual = mi(highs, lows);
    expect(roundDigitsAll(2, actual)).toStrictEqual(expected);
  });
});
