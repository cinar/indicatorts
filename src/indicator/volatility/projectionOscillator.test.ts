// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { roundDigitsAll } from '../../helper/numArray';
import { po } from './projectionOscillator';

describe('Projection Oscillator (PO)', () => {
  const highs = [10, 9, 12, 14, 12];
  const lows = [6, 7, 9, 12, 10];
  const closings = [9, 11, 7, 10, 8];

  it('should be able to compute with a config', () => {
    const expectedPO = [75, 125, 18.75, 53.33, 26.67];
    const expectedSPO = [75, 108.33, 48.61, 51.76, 35.03];

    const actual = po(highs, lows, closings, { period: 9, smooth: 2 });
    expect(roundDigitsAll(2, actual.poResult)).toStrictEqual(expectedPO);
    expect(roundDigitsAll(2, actual.spoResult)).toStrictEqual(expectedSPO);
  });

  it('should be able to compute without a config', () => {
    const expectedPO = [75, 125, 18.75, 53.33, 26.67];
    const expectedSPO = [75, 100, 59.38, 56.35, 41.51];

    const actual = po(highs, lows, closings);
    expect(roundDigitsAll(2, actual.poResult)).toStrictEqual(expectedPO);
    expect(roundDigitsAll(2, actual.spoResult)).toStrictEqual(expectedSPO);
  });
});
