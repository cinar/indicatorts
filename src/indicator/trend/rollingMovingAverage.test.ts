// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { rma } from './rollingMovingAverage';

describe('Rolling Moving Average (RMA)', () => {
  const values = [2, 4, 6, 8, 10, 12];

  it('should be able to compute with a config', () => {
    const expected = [2, 3, 4, 5, 6, 7];

    const actual = rma(values, { period: 8 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute with a config', () => {
    const expected = [2, 3, 4, 5, 6.25, 7.69];

    const actual = rma(values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
