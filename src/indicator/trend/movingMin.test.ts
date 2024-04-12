// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { mmin } from './movingMin';

describe('Moving Min (MMIN)', () => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should be able to compute with a config', () => {
    const expected = [1, 1, 1, 1, 1, 1, 1, 1, 2, 3];

    const actual = mmin(values, { period: 8 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 1, 1, 1, 2, 3, 4, 5, 6, 7];

    const actual = mmin(values);
    deepStrictEqual(actual, expected);
  });
});
