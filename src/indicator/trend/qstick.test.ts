// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { qstick } from './qstick';

describe('Qstick', () => {
  const openings = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const closings = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  it('should be able to compute with a config', () => {
    const expected = [-5, -7.5, -10, -12.5, -15, -17.5, -20, -22.5, -25, -30];

    const actual = qstick(openings, closings, { period: 9 });
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });

  it('should be able to compute without a config', () => {
    const expected = [-5, -7.5, -10, -12.5, -15, -17.5, -20, -22.5, -25, -27.5];

    const actual = qstick(openings, closings);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
