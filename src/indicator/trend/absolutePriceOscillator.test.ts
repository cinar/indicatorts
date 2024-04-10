// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { apo } from './absolutePriceOscillator';

describe('Absolute Price Oscillator (APO)', () => {
  const values = [1, 2, 1, 5, 8, 10, 4, 6, 5, 2];

  it('should be able to compute with a config', () => {
    const expected = [0, 0.33, 0, 1.26, 2.26, 2.65, 0.14, 0.22, -0.14, -1.19];

    const actual = apo(values, { fast: 2, slow: 5 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 0.07, 0.06, 0.32, 0.74, 1.21, 1.16, 1.26, 1.25, 1.03];

    const actual = apo(values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
