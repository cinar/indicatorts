// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { msum } from './msum';

describe('Moving Sum (MSUM)', () => {
  it('should be able to compute with a config', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [1, 3, 6, 10, 14, 18, 22, 26, 30, 34];

    const actual = msum(values, { period: 4 });
    deepStrictEqual(actual, expected);
  });

  // TODO: Test - without a config
});
