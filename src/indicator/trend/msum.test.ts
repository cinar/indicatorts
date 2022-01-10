// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import {deepStrictEqual} from 'assert';
import {msum} from './msum';

describe('Moving Sum', () => {
  it('should be able to compute sum', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [1, 3, 6, 10, 14, 18, 22, 26, 30, 34];
    const period = 4;

    const actual = msum(period, values);
    deepStrictEqual(actual, expected);
  });
});
