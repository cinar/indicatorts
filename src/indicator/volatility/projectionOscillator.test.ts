// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { po } from './projectionOscillator';

describe('Projection Oscillator (PO)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedPO = [75, 125, 12.5, 32, 16];
    const expectedSPO = [75, 108.33, 44.44, 36.15, 22.72];

    const actual = po(highs, lows, closings, { period: 9, smooth: 2 });
    expect(roundDigitsAll(2, actual.poResult)).toStrictEqual(expectedPO);
    expect(roundDigitsAll(2, actual.spoResult)).toStrictEqual(expectedSPO);
  });

  it('should be able to compute without a config', () => {
    const expectedPO = [75, 125, 12.5, 32, 16];
    const expectedSPO = [75, 100, 56.25, 44.13, 30.06];

    const actual = po(highs, lows, closings);
    expect(roundDigitsAll(2, actual.poResult)).toStrictEqual(expectedPO);
    expect(roundDigitsAll(2, actual.spoResult)).toStrictEqual(expectedSPO);
  });
});
