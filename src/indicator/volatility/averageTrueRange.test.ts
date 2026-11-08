// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
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

  it('should smooth the true range with Wilder smoothing once a full period is available', () => {
    // TR = [2, 3, 2, 3, 3, 2]. The first full period averages to 7 / 3,
    // after which ATR[i] = (ATR[i - 1] * (period - 1) + TR[i]) / period.
    const wHighs = [10, 12, 11, 13, 15, 14];
    const wLows = [8, 9, 9, 10, 12, 12];
    const wClosings = [9, 11, 10, 12, 14, 13];
    const expectedAtr = [2, 2.5, 2.33, 2.56, 2.7, 2.47];

    const actual = atr(wHighs, wLows, wClosings, { period: 3 });
    expect(roundDigitsAll(2, actual.atrLine)).toStrictEqual(expectedAtr);
  });
});
