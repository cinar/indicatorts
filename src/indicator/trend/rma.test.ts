// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { rma } from './rma';

describe('Rolling Moving Average (RMA)', () => {
  it('should be able to compute rma', () => {
    const values = [2, 4, 6, 8, 10, 12];
    const expected = [2, 3, 4, 5, 6.25, 7.69];
    const period = 4;

    const actual = rma(values, { period });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
