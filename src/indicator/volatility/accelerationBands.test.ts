// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { ab } from './accelerationBands';

describe('Acceleration Bands (AB)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedUpper = [20, 16.75, 17.45, 17.67, 17.41];
    const expectedMiddle = [9, 10, 9, 9.25, 9];
    const expectedLower = [0, 1.75, 2.45, 3.92, 4.41];

    const actual = ab(highs, lows, closings, { period: 9 });
    expect(roundDigitsAll(2, actual.upper)).toStrictEqual(expectedUpper);
    expect(roundDigitsAll(2, actual.middle)).toStrictEqual(expectedMiddle);
    expect(roundDigitsAll(2, actual.lower)).toStrictEqual(expectedLower);
  });

  it('should be able to compute without a config', () => {
    const expectedUpper = [20, 16.75, 17.45, 17.67, 17.41];
    const expectedMiddle = [9, 10, 9, 9.25, 9];
    const expectedLower = [0, 1.75, 2.45, 3.92, 4.41];

    const actual = ab(highs, lows, closings);
    expect(roundDigitsAll(2, actual.upper)).toStrictEqual(expectedUpper);
    expect(roundDigitsAll(2, actual.middle)).toStrictEqual(expectedMiddle);
    expect(roundDigitsAll(2, actual.lower)).toStrictEqual(expectedLower);
  });
});
