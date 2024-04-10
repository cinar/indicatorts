// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { typprice } from './typicalPrice';

describe('Typical Price', () => {
  const highs = [1404.14, 1405.95, 1405.98, 1405.87, 1410.03];
  const lows = [1396.13, 1398.8, 1395.62, 1397.32, 1400.6];
  const closings = [1402.22, 1402.8, 1405.87, 1404.11, 1403.93];

  it('should be able to compute', () => {
    const expected = [1400.83, 1402.51667, 1402.49, 1402.43333, 1404.85333];

    const actual = typprice(highs, lows, closings);
    deepStrictEqual(roundDigitsAll(5, actual), expected);
  });
});
