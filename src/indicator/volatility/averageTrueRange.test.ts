// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { atr } from './averageTrueRange';

describe('Average True Range (ATR)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedTr = [4, 2, 3, 7, 2];
    const expectedAtr = [4, 3, 3, 4, 3.6];

    const actual = atr(highs, lows, closings, { period: 9 });
    expect(roundDigitsAll(2, actual.trLine)).toStrictEqual(expectedTr);
    expect(roundDigitsAll(2, actual.atrLine)).toStrictEqual(expectedAtr);
  });

  it('should be able to compute without a config', () => {
    const expectedTr = [4, 2, 3, 7, 2];
    const expectedAtr = [4, 3, 3, 4, 3.6];

    const actual = atr(highs, lows, closings);
    expect(roundDigitsAll(2, actual.trLine)).toStrictEqual(expectedTr);
    expect(roundDigitsAll(2, actual.atrLine)).toStrictEqual(expectedAtr);
  });
});
