// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { defaultKeltnerChannel } from './keltnerChannel';

describe('Keltner Channel', () => {
  it('should be able to compute KC', () => {
    const highs = [10, 9, 12, 14, 12];
    const lows = [6, 7, 9, 12, 10];
    const closings = [9, 11, 7, 10, 8];
    const expectedMiddleLine = [9, 9.19, 8.98, 9.08, 8.98];
    const expectedUpperBand = [17, 15.19, 14.98, 17.08, 16.18];
    const expectedLowerBand = [1, 3.19, 2.98, 1.08, 1.78];

    const actual = defaultKeltnerChannel(highs, lows, closings);
    expect(roundDigitsAll(2, actual.middleLine)).toStrictEqual(
      expectedMiddleLine
    );
    expect(roundDigitsAll(2, actual.upperBand)).toStrictEqual(
      expectedUpperBand
    );
    expect(roundDigitsAll(2, actual.lowerBand)).toStrictEqual(
      expectedLowerBand
    );
  });
});
