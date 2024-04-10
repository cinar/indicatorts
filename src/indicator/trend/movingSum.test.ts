// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { msum } from './movingSum';

describe('Moving Sum (MSUM)', () => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should be able to compute with a config', () => {
    const expected = [1, 3, 6, 10, 15, 21, 28, 35, 42, 49];

    const actual = msum(values, { period: 7 });
    deepStrictEqual(actual, expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [1, 3, 6, 10, 14, 18, 22, 26, 30, 34];

    const actual = msum(values);
    deepStrictEqual(actual, expected);
  });
});
