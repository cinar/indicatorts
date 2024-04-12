// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { ce } from './chandelierExit';

describe('Chandelier Exit (CE)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedLong = [-2, 1, 3, 2, 3.2];
    const expectedShort = [18, 15, 15, 18, 16.8];

    const actual = ce(highs, lows, closings, { period: 14 });
    expect(roundDigitsAll(2, actual.long)).toStrictEqual(expectedLong);
    expect(roundDigitsAll(2, actual.short)).toStrictEqual(expectedShort);
  });

  it('should be able to compute without a config', () => {
    const expectedLong = [-2, 1, 3, 2, 3.2];
    const expectedShort = [18, 15, 15, 18, 16.8];

    const actual = ce(highs, lows, closings);
    expect(roundDigitsAll(2, actual.long)).toStrictEqual(expectedLong);
    expect(roundDigitsAll(2, actual.short)).toStrictEqual(expectedShort);
  });
});
