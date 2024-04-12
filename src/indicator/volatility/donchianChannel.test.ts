// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../index';
import { dc } from './donchianChannel';

describe('Donchian Channel (DC)', () => {
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedUpper = [9, 11, 11, 11, 11];
    const expectedMiddle = [9, 10, 9, 9, 9];
    const expectedLower = [9, 9, 7, 7, 7];

    const actual = dc(closings, { period: 8 });
    expect(roundDigitsAll(2, actual.upper)).toStrictEqual(expectedUpper);
    expect(roundDigitsAll(2, actual.middle)).toStrictEqual(expectedMiddle);
    expect(roundDigitsAll(2, actual.lower)).toStrictEqual(expectedLower);
  });

  it('should be able to compute without a config', () => {
    const expectedUpper = [9, 11, 11, 11, 11];
    const expectedMiddle = [9, 10, 9, 9, 9];
    const expectedLower = [9, 9, 7, 7, 7];

    const actual = dc(closings);
    expect(roundDigitsAll(2, actual.upper)).toStrictEqual(expectedUpper);
    expect(roundDigitsAll(2, actual.middle)).toStrictEqual(expectedMiddle);
    expect(roundDigitsAll(2, actual.lower)).toStrictEqual(expectedLower);
  });
});
