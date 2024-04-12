// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { aroon } from './aroon';

describe('Aroon', () => {
  const highs = [40, 25, 20, 60];
  const lows = [4, 10, 5, 6];

  it('should be able to compute with a config', () => {
    const expectedUp = [100, 92.86, 85.71, 100];
    const expectedDown = [100, 92.86, 85.71, 78.57];

    const actual = aroon(highs, lows, { period: 14 });
    deepStrictEqual(roundDigitsAll(2, actual.up), expectedUp);
    deepStrictEqual(roundDigitsAll(2, actual.down), expectedDown);
  });

  it('should be able to compute without a config', () => {
    const expectedUp = [100, 96, 92, 100];
    const expectedDown = [100, 96, 92, 88];

    const actual = aroon(highs, lows);
    deepStrictEqual(roundDigitsAll(2, actual.up), expectedUp);
    deepStrictEqual(roundDigitsAll(2, actual.down), expectedDown);
  });
});
