// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { bop } from './balanceOfPower';

describe('Balance of Powers (BOP)', () => {
  it('should be able to compute', () => {
    const openings = [10, 20, 15, 50];
    const highs = [40, 25, 20, 60];
    const lows = [4, 10, 5, 6];
    const closings = [20, 15, 50, 55];
    const expected = [0.28, -0.33, 2.33, 0.09];

    const actual = bop(openings, highs, lows, closings);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
