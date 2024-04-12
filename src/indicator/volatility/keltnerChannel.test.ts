// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { kc } from './keltnerChannel';

describe('Keltner Channel (KC)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedMiddle = [9, 9.27, 8.96, 9.1, 8.96];
    const expectedUpper = [17, 15.27, 14.96, 17.1, 16.16];
    const expectedLower = [1, 3.27, 2.96, 1.1, 1.76];

    const actual = kc(highs, lows, closings, { period: 14 });
    expect(roundDigitsAll(2, actual.middle)).toStrictEqual(expectedMiddle);
    expect(roundDigitsAll(2, actual.upper)).toStrictEqual(expectedUpper);
    expect(roundDigitsAll(2, actual.lower)).toStrictEqual(expectedLower);
  });

  it('should be able to compute without a config', () => {
    const expectedMiddle = [9, 9.19, 8.98, 9.08, 8.98];
    const expectedUpper = [17, 15.19, 14.98, 17.08, 16.18];
    const expectedLower = [1, 3.19, 2.98, 1.08, 1.78];

    const actual = kc(highs, lows, closings);
    expect(roundDigitsAll(2, actual.middle)).toStrictEqual(expectedMiddle);
    expect(roundDigitsAll(2, actual.upper)).toStrictEqual(expectedUpper);
    expect(roundDigitsAll(2, actual.lower)).toStrictEqual(expectedLower);
  });
});
