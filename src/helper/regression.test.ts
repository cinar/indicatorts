// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual, strictEqual } from 'assert';
import { roundDigits, roundDigitsAll } from './numArray';
import {
  leastSquare,
  linearRegressionUsingLeastSquare,
  movingLeastSquare,
} from './regression';

describe('Linear Regressin', () => {
  it('should be able to compute the least square', () => {
    const x = [2, 3, 5, 7, 9];
    const y = [4, 5, 7, 10, 15];
    const expectedM = 1.5183;
    const expectedB = 0.3049;

    const actual = leastSquare(x, y);
    strictEqual(roundDigits(4, actual.m), expectedM);
    strictEqual(roundDigits(4, actual.b), expectedB);
  });

  it('should be able to compute moving least square', () => {
    const x = [1, 2, 3, 4, 2, 3, 5, 7, 9];
    const y = [1, 2, 3, 4, 4, 5, 7, 10, 15];
    const period = 5;
    const expectedM = [0, 1, 1, 1, 0.8462, 0.5714, 0.9231, 1.2162, 1.5183];
    const expectedB = [0, 0, 0, 0, 0.7692, 2, 1.4615, 0.8919, 0.3049];

    const actual = movingLeastSquare(period, x, y);
    deepStrictEqual(roundDigitsAll(4, actual.m), expectedM);
    deepStrictEqual(roundDigitsAll(4, actual.b), expectedB);
  });

  it('should be able to compute the linear regression', () => {
    const x = [0, 2, 5, 7];
    const y = [-1, 5, 12, 20];
    const expected = [-1.1379, 4.6552, 13.3448, 19.1379];

    const actual = linearRegressionUsingLeastSquare(x, y);
    deepStrictEqual(roundDigitsAll(4, actual), expected);
  });
});
