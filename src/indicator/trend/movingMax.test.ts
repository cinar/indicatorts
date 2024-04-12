// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { mmax } from './movingMax';

describe('Moving Max (MMAX)', () => {
  const values = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  it('should be able to compute with a config', () => {
    const expected = [10, 10, 10, 10, 10, 10, 10, 10, 9, 8];

    const actual = mmax(values, { period: 8 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [10, 10, 10, 10, 9, 8, 7, 6, 5, 4];

    const actual = mmax(values);
    deepStrictEqual(actual, expected);
  });
});
