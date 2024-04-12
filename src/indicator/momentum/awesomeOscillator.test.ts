// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { ao } from './awesomeOscillator';

describe('Awesome Oscillator (AO)', () => {
  const highs = [10, 11, 12, 13, 14, 15, 16, 17];
  const lows = [1, 2, 3, 4, 5, 6, 7, 8];

  it('should be able to compute with a config', () => {
    const expected = [0, 0, 0.5, 1, 1.5, 2, 2.5, 3];

    const actual = ao(highs, lows, {
      fast: 2,
      slow: 20,
    });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [0, 0, 0, 0, 0, 0.5, 1, 1.5];

    const actual = ao(highs, lows);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
