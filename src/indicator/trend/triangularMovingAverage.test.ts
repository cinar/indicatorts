// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { trima } from './triangularMovingAverage';

describe('Triangular Moving Average (TRIMA)', () => {
  const values = [1, 2, 1, 5, 8, 10, 4, 6, 5, 2];

  it('should be able to compute with a config', () => {
    const expected = [1, 1.25, 1.28, 1.52, 1.9, 2.74, 3.56, 4.61, 5.48, 5.88];

    const actual = trima(values, { period: 9 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 1.25, 1.42, 2, 3.67, 6.17, 7.5, 7, 5.83, 4.67];

    const actual = trima(values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
