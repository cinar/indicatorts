// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { since } from './since';

describe('Since last change count', () => {
  it('should be able to compute', () => {
    const values = [1, 2, 2, 3, 4, 4, 4, 4, 5, 6];
    const expected = [0, 0, 1, 0, 0, 1, 2, 3, 0, 0];

    const actual = since(values);
    deepStrictEqual(actual, expected);
  });
});
